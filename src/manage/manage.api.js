"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//let mngApi = $2sxc._manage;
/**
 * Get a html tag of the current sxc instance
 * @param {any} sxci
 * @return {jquery} - resulting html
 */
function getTag(sxci) {
    return $("div[data-cb-id='" + sxci.cbid + "']")[0];
}
exports.getTag = getTag;
;
/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @param {any} htmlTag
 * @return {any} edit-context object
 */
function getEditContextOfTag(htmlTag) {
    var attr = htmlTag.getAttribute('data-edit-context');
    return JSON.parse(attr || '');
}
exports.getEditContextOfTag = getEditContextOfTag;
;
/**
 * get edit-context info of an sxc-object
 * @param {any} sxc
 * @return {any} edit context info
 */
function getEditContext(sxc) {
    return getEditContextOfTag(getTag(sxc));
}
exports.getEditContext = getEditContext;
;
/**
 * builds a config object used in the toolbar system
 * @param {any} editContext
 * @returns {any} object containing various properties for this current sxc-instance
 */
function buildInstanceConfig(editContext) {
    var ce = editContext.Environment, cg = editContext.ContentGroup, cb = editContext.ContentBlock;
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
}
exports.buildInstanceConfig = buildInstanceConfig;
;
function getUserOfEditContext(editContext) {
    return {
        canDesign: editContext.User.CanDesign,
        canDevelop: editContext.User.CanDesign
    };
}
exports.getUserOfEditContext = getUserOfEditContext;
;
/**
 * create a config-object for the quick-dialog, with all settings which the quick-dialog will need
 * @param {any} editContext
 * @returns {any}
 */
function buildQuickDialogConfig(editContext) {
    return {
        appId: editContext.ContentGroup.AppId,
        isContent: editContext.ContentGroup.IsContent,
        hasContent: editContext.ContentGroup.HasContent,
        isList: editContext.ContentGroup.IsList,
        templateId: editContext.ContentGroup.TemplateId,
        contentTypeId: editContext.ContentGroup.ContentTypeName,
        templateChooserVisible: editContext.ContentBlock.ShowTemplatePicker,
        user: getUserOfEditContext(editContext),
        supportsAjax: editContext.ContentGroup.SupportsAjax
    };
}
exports.buildQuickDialogConfig = buildQuickDialogConfig;
;
/**
 * get all parameters needed by NG dialogs from an sxc
 * @param {any} sxc
 * @param {any} [editContext]
 * @return {any} special object containing the ng-dialog parameters
 */
function buildNgDialogParams(sxc, editContext) {
    if (!editContext)
        editContext = getEditContext(sxc);
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
}
exports.buildNgDialogParams = buildNgDialogParams;
;
//# sourceMappingURL=manage.api.js.map