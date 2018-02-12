import { getTag } from '../manage/api';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';


// quick debug - set to false if not needed for production
const dbg = true;

// default / fallback settings for toolbars when nothings is specified
const settingsForEmptyToolbar = {
  hover: 'left',
  autoAddMore: 'left',
};

// generate an empty / fallback toolbar tag
function generateFallbackToolbar() {
  const settingsString = JSON.stringify(settingsForEmptyToolbar);
  return $(`<ul class='sc-menu' toolbar='' settings='${settingsString}'/>`);
}

// find current toolbars inside this wrapper-tag
function getToolbarTags(parentTag: any): any {
  const allInner: any = $('.sc-menu[toolbar],.sc-menu[data-toolbar]', parentTag);

  // return only those, which don't belong to a sub-item
  const res: any = allInner.filter((i, e) => $(e).closest('.sc-content-block')[0] === parentTag[0]);
  if (dbg) console.log('found toolbars for parent', parentTag, res);
  return res;
}

// create a process-toolbar command to generate toolbars inside a tag
export function buildToolbars(parentTag: any, optionalId?: number) {
  parentTag = $(parentTag || '.DnnModule-' + optionalId);

  // if something says the toolbars are disabled, then skip
  if (parentTag.attr(twoSxc._toolbarManager.cDisableAttrName)) return;

  // todo: change mechanism to not render toolbar, this uses a secret class name which the toolbar shouldn't know
  // don't add, if it is has un-initialized content
  // 2017-09-08 2dm disabled this, I believe the bootstrapping should never call this any more, if sc-uninitialized. if ok, then delete this in a few days
  // let disableAutoAdd = $(".sc-uninitialized", parentTag).length !== 0;

  let toolbars: any = getToolbarTags(parentTag);

  // no toolbars found, must help a bit because otherwise editing is hard
  if (toolbars.length === 0) { // && !disableAutoAdd) {
    if (dbg) console.log("didn't find toolbar, so will auto-create", parentTag);

    const outsideCb: boolean = !parentTag.hasClass(twoSxc.c.cls.scCb); // "sc-content-block");
    const contentTag: any = outsideCb ? parentTag.find('div.sc-content-block') : parentTag;
    contentTag.addClass(twoSxc.c.cls.scElm); // "sc-element");

    contentTag.prepend(generateFallbackToolbar());
    toolbars = getToolbarTags(parentTag);
  }

  toolbars.each(function initToolbar(): void {
    const tag: any = $(this);
    let data: any = null;
    let toolbarConfig: any;
    let toolbarSettings: any;
    const at = twoSxc.c.attr;

    try {
      data = tag.attr(at.toolbar) || tag.attr(at.toolbarData) || '{}';
      toolbarConfig = JSON.parse(data);
      data = tag.attr(at.settings) || tag.attr(at.settingsData) || '{}';
      toolbarSettings = JSON.parse(data);
      if (toolbarConfig === {} && toolbarSettings === {})
        toolbarSettings = settingsForEmptyToolbar;
    } catch (err) {
      console.error('error in settings JSON - probably invalid - make sure you also quote your properties like "name": ...', data, err);
      return;
    }

    try {
      const sxc: SxcInstanceWithInternals = twoSxc(tag) as SxcInstanceWithInternals;
      tag.replaceWith(sxc.manage.getToolbar(toolbarConfig, toolbarSettings));
    } catch (err2) {
      // note: errors happen a lot on custom toolbars, make sure the others are still rendered
      console.error('error creating toolbar - will skip this one', err2);
    }
  });
}

export function disable(tag: any): void {
  tag = $(tag);
  tag.attr(twoSxc._toolbarManager.cDisableAttrName, true);
}

export function isDisabled(sxc: SxcInstanceWithInternals): boolean {
  const tag: any = $(getTag(sxc));
  return !!tag.attr(twoSxc._toolbarManager.cDisableAttrName);
}
