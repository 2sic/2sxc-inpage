import { DataEditContext } from '../data-edit-context/data-edit-context';

//declare let window: Window;

//let mngApi = $2sxc._manage;

/**
 * Get a html tag of the current sxc instance
 * @param {SxcInstanceWithInternals} sxci
 * @return {jquery} - resulting html
 */
export function getTag(sxci: SxcInstanceWithInternals): any {
  return $(`div[data-cb-id='${sxci.cbid}']`)[0];
};

/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @param {any} htmlTag
 * @return {DataEditContext} edit-context object
 */
export function getEditContextOfTag(htmlTag: any): DataEditContext {
  let attr = htmlTag.getAttribute('data-edit-context');
  return JSON.parse(attr || '') as DataEditContext;
};

/**
 * get edit-context info of an sxc-object
 * @param {SxcInstanceWithInternals} sxc
 * @return {DataEditContext} edit context info
 */
export function getEditContext(sxc: SxcInstanceWithInternals): DataEditContext {
  return getEditContextOfTag(getTag(sxc));
};

/**
 * builds a config object used in the toolbar system
 * @param {DataEditContext} editContext
 * @returns {any} object containing various properties for this current sxc-instance
 */
export function buildInstanceConfig(editContext: DataEditContext) {
  let ce = editContext.Environment;
  let cg = editContext.ContentGroup;
  let cb = editContext.ContentBlock;

  return {
    portalId: ce.WebsiteId,
    tabId: ce.PageId,
    moduleId: ce.InstanceId,
    version: ce.SxcVersion,

    contentGroupId: cg.Guid,
    cbIsEntity: cb.IsEntity,
    cbId: cb.Id,
    appPath: cg.AppUrl,
    isList: cg.IsList
  };
};

/**
 * builds UserOfEditcontext object
 * @param {DataEditContext} editContext
 */
export function getUserOfEditContext(editContext: DataEditContext) {
  return {
    canDesign: editContext.User.CanDesign,
    canDevelop: editContext.User.CanDesign
  };
};

/**
 * create a config-object for the quick-dialog, with all settings which the quick-dialog will need
 * @param {DataEditContext} editContext
 * @returns {any} 
 */
export function buildQuickDialogConfig(editContext: DataEditContext) {
  return {
    appId: editContext.ContentGroup.AppId,
    isContent: editContext.ContentGroup.IsContent,
    hasContent: editContext.ContentGroup.HasContent,
    isList: editContext.ContentGroup.IsList,
    templateId: editContext.ContentGroup.TemplateId,
    contentTypeId: editContext.ContentGroup.ContentTypeName,
    templateChooserVisible: editContext.ContentBlock.ShowTemplatePicker, // todo: maybe move to content-goup
    user: getUserOfEditContext(editContext),
    supportsAjax: editContext.ContentGroup.SupportsAjax
  };
};

/**
 * get all parameters needed by NG dialogs from an sxc
 * @param {SxcInstanceWithInternals} sxc
 * @param {DataEditContext} [editContext]
 * @return {any} special object containing the ng-dialog parameters
 */
export function buildNgDialogParams(sxc: SxcInstanceWithInternals, editContext: DataEditContext) {
  if (!editContext) editContext = getEditContext(sxc);
  return {
    zoneId: editContext.ContentGroup.ZoneId,
    appId: editContext.ContentGroup.AppId,
    tid: editContext.Environment.PageId,
    mid: editContext.Environment.InstanceId,
    cbid: sxc.cbid,
    lang: editContext.Language.Current,
    langpri: editContext.Language.Primary,
    langs: JSON.stringify(editContext.Language.All),
    portalroot: editContext.Environment.WebsiteUrl,
    websiteroot: editContext.Environment.SxcRootUrl,
    partOfPage: editContext.ContentBlock.PartOfPage,
    //versioningRequirements: editContext.ContentBlock.VersioningRequirements,
    publishing: editContext.ContentBlock.VersioningRequirements,

    // todo: probably move the user into the dashboard info
    user: getUserOfEditContext(editContext),
    approot: editContext.ContentGroup.AppUrl || null // this is the only value which doesn't have a slash by default.  note that the app-root doesn't exist when opening "manage-app"
  };
};
