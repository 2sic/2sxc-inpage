import { context } from '../context/context';
import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
import { getTag } from '../manage/api';
import { renderToolbar } from './item/render-toolbar';
import { expandToolbarConfig } from './toolbar/toolbar-expand-config';
import { settingsForEmptyToolbar, ToolbarSettings } from './toolbar/toolbar-settings';
import { Log } from '../logging/log';
import Constants = require('../constants');

// quick debug - set to false if not needed for production
const dbg = false;

// generate an empty / fallback toolbar tag
export function generateFallbackToolbar(): any {
  const settingsString = JSON.stringify(settingsForEmptyToolbar);
  return $(`<ul class='sc-menu' toolbar='' settings='${settingsString}'/>`);
}

// find current toolbars inside this wrapper-tag
function getToolbarTags(parentTag: JQuery<HTMLElement>): JQuery<HTMLElement> {
  const allInner = $(`.sc-menu[toolbar],.sc-menu[data-toolbar],[${Constants.toolbar.attr.full}]`, parentTag);

  // return only those, which don't belong to a sub-item
  const onlyDirectDescendents = allInner.filter((i: number, e: HTMLElement) => $(e).closest(Constants.cb.selectors.ofName)[0] === parentTag[0]);
  if (dbg)
    console.log('found toolbars for parent', parentTag, onlyDirectDescendents);
  return onlyDirectDescendents;
}


// create a process-toolbar command to generate toolbars inside a tag
export function buildToolbars(parentLog: Log, parentTag: JQuery<HTMLElement>, optionalId?: number): void {
  const log = new Log('Tlb.BldAll', parentLog);
  parentTag = $(parentTag || '.DnnModule-' + optionalId);

  // if something says the toolbars are disabled, then skip
  if (parentTag.attr(Constants.toolbar.attr.disable))
    return;

  let toolbars = getToolbarTags(parentTag);

  // no toolbars found, must help a bit because otherwise editing is hard
  if (toolbars.length === 0)
    toolbars = addFallbackAndGetThatToolbar(parentTag);

  for (let i = 0; i < toolbars.length; i++) {

    const tag: any = $(toolbars[i]);

    let toolbarData: any;
    let toolbarSettings: ToolbarSettings;
    const at = $2sxc.c.attr;

    try {
      const newConfigFormat = tryGetAttrText(toolbars[i], Constants.toolbar.attr.full);
      if (newConfigFormat) {
        const fullConfig = JSON.parse(newConfigFormat);
        toolbarData = fullConfig.toolbar;
        toolbarSettings = fullConfig.settings as ToolbarSettings;
      } else {
        const data = getTextContent(toolbars[i], at.toolbar, at.toolbarData);

        toolbarData = JSON.parse(data);

        const settings = getTextContent(toolbars[i], at.settings, at.settingsData);

        toolbarSettings = JSON.parse(settings) as ToolbarSettings;
      }
    } catch (err) {
      console.error(
        'error in settings JSON - probably invalid - make sure you also quote your properties like "name": ...',
        // ReSharper disable once UsageOfPossiblyUnassignedValue
        toolbarData,
        err);
      return;
    }

    try {

      const cnt = context(tag);

      cnt.toolbar = expandToolbarConfig(cnt, toolbarData, toolbarSettings, log);

      const toolbar = renderToolbar(cnt);

      if (tag.attr(Constants.toolbar.attr.full)) {
        // new case, where the full toolbar is included in one setting
        tag.prepend(toolbar);
        ensureToolbarHoverClass(tag);
      } else {
        // default case, tag is the old <ul> tag
        // todo: find the sc-element parent before replacing
        const scElementParent = tag.closest(Constants.toolbar.selectors.ofOldHover);
        tag.replaceWith(toolbar);

        if (scElementParent.length > 0)
          ensureToolbarHoverClass(scElementParent);
      }

    } catch (err2) {
      // note: errors happen a lot on custom toolbars, make sure the others are still rendered
      console.error('error creating toolbar - will skip this one', err2);
    }

  }
}

function ensureToolbarHoverClass(jtag: JQuery<HTMLElement>): void {
  if (jtag.length <= 0) return; // skip in case nothing was given
  const tag = jtag[0];
  if (!tag.hasAttribute(Constants.toolbar.attr.hover))
    tag.setAttribute(Constants.toolbar.attr.hover, '');
}

// 2019-02-18 2dm extracted function for better readibilyt, not tested yet
function addFallbackAndGetThatToolbar(parentTag: JQuery<HTMLElement>): JQuery<HTMLElement> {
  if (dbg)
    console.log("didn't find toolbar, so will auto-create", parentTag);

  const outsideCb = !parentTag.hasClass(Constants.cb.classes.name); 
  const contentTag: any = outsideCb ? parentTag.find('div' + Constants.cb.selectors.ofName) : parentTag;
  // todo: modify to use the new 2sxc 9.40 syntax, drop the sc-element
  contentTag.addClass(Constants.toolbar.classes.oldHover);

  // auto toolbar
  const cnt = context(contentTag);
  if (cnt.ui.autoToolbar !== false)
    contentTag.prepend(generateFallbackToolbar());

  return getToolbarTags(parentTag);
}

function getTextContent(toolbar: HTMLElement, name1: string, name2: string): string {
  // 2019-02-18 2dm shortened, not tested yet
  return tryGetAttrText(toolbar, name1) || tryGetAttrText(toolbar, name2) || '{}';
  //const item1 = toolbar.attributes.getNamedItem(name1);
  //const item2 = toolbar.attributes.getNamedItem(name2);
  //if (item1 && item1.textContent) {
  //  return item1.textContent;
  //} else if (item2 && item2.textContent) {
  //  return item2.textContent;
  //};
  //return '{}';
}

// 2019-02-18 2dm shortened, not tested yet
function tryGetAttrText(tag: HTMLElement, name: string): string {
  const item1 = tag.attributes.getNamedItem(name);
  return item1 && item1.textContent;
}

export function disable(tag: any): void {
  tag = $(tag);
  tag.attr(Constants.toolbar.attr.disable, true);
}

export function isDisabled(sxc: SxcInstanceWithInternals): boolean {
  const tag: any = $(getTag(sxc));
  return !!tag.attr(Constants.toolbar.attr.disable);
}
