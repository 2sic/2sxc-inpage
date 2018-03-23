import { context } from '../context/context';
import { getTag } from '../manage/api';
import { renderToolbar } from './item/render-toolbar';
import { disableToolbarAttribute } from './toolbar-manager';
import { expandToolbarConfig as ExpandToolbarConfig } from './toolbar/toolbar-expand-config';
import { settingsForEmptyToolbar, ToolbarSettings } from './toolbar/toolbar-settings';
import { HasLog } from '../logging/has-log';
import { Log } from '../logging/log';

// quick debug - set to false if not needed for production
const dbg = false;

// generate an empty / fallback toolbar tag
export function generateFallbackToolbar(): any {
  const settingsString = JSON.stringify(settingsForEmptyToolbar);
  return $(`<ul class='sc-menu' toolbar='' settings='${settingsString}'/>`);
}

// find current toolbars inside this wrapper-tag
function getToolbarTags(parentTag: any): any {
  const allInner: any = $('.sc-menu[toolbar],.sc-menu[data-toolbar]', parentTag);

  // return only those, which don't belong to a sub-item
  const res: any = allInner.filter((i: any, e: any) => $(e).closest('.sc-content-block')[0] === parentTag[0]);
  if (dbg) console.log('found toolbars for parent', parentTag, res);
  return res;
}


// create a process-toolbar command to generate toolbars inside a tag
export function buildToolbars(parentLog: Log, parentTag: any, optionalId?: number): void {
  const log = new Log('Tlb.BldAll', parentLog);
  parentTag = $(parentTag || '.DnnModule-' + optionalId);

  // if something says the toolbars are disabled, then skip
  if (parentTag.attr(disableToolbarAttribute)) return;

  // todo: change mechanism to not render toolbar, this uses a secret class name which the toolbar shouldn't know
  // don't add, if it is has un-initialized content
  // 2017-09-08 2dm disabled this, I believe the bootstrapping should never call this any more, if sc-uninitialized. if ok, then delete this in a few days
  // let disableAutoAdd = $(".sc-uninitialized", parentTag).length !== 0;

  let toolbars: any = getToolbarTags(parentTag);

  // no toolbars found, must help a bit because otherwise editing is hard
  if (toolbars.length === 0) { // && !disableAutoAdd) {
    if (dbg) console.log("didn't find toolbar, so will auto-create", parentTag);

    const outsideCb = !parentTag.hasClass($2sxc.c.cls.scCb); // "sc-content-block");
    const contentTag: any = outsideCb ? parentTag.find('div.sc-content-block') : parentTag;
    contentTag.addClass($2sxc.c.cls.scElm); // "sc-element");

    contentTag.prepend(generateFallbackToolbar());
    toolbars = getToolbarTags(parentTag);
  }

  for (let i = 0; i < toolbars.length; i++) {

    const tag: any = $(toolbars[i]);

    let toolbarData: any;
    let toolbarSettings: ToolbarSettings;
    const at = $2sxc.c.attr;

    try {
      const data = getTextContent(toolbars[i], at.toolbar, at.toolbarData);

      toolbarData = JSON.parse(data);

      const settings = getTextContent(toolbars[i], at.settings, at.settingsData);

      toolbarSettings = JSON.parse(settings);

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

      cnt.toolbar = ExpandToolbarConfig(cnt, toolbarData, toolbarSettings, log);

      const toolbar = renderToolbar(cnt);

      tag.replaceWith(toolbar);

    } catch (err2) {
      // note: errors happen a lot on custom toolbars, make sure the others are still rendered
      console.error('error creating toolbar - will skip this one', err2);
    }

  }
}

function getTextContent(toolbar: any, name1: string, name2: string): string {
  const item1 = toolbar.attributes.getNamedItem(name1);
  const item2 = toolbar.attributes.getNamedItem(name2);
  if (item1 && item1.textContent) {
    return item1.textContent;
  } else if (item2 && item2.textContent) {
    return item2.textContent;
  };
  return '{}';
}

export function disable(tag: any): void {
  tag = $(tag);
  tag.attr(disableToolbarAttribute, true);
}

export function isDisabled(sxc: SxcInstanceWithInternals): boolean {
  const tag: any = $(getTag(sxc));
  return !!tag.attr(disableToolbarAttribute);
}
