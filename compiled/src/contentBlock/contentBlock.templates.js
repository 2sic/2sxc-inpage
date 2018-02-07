"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _2sxc__quickDialog_1 = require("../quick-dialog/2sxc._quickDialog");
var render_1 = require("./render");
var contentBlock_webApiPromises_1 = require("./contentBlock.webApiPromises");
/*
 * this is part of the content block manager
 */
//return;
/**
 * prepare the instance so content can be added
 * this ensure the content-group has been created, which is required to add content
 * @param {} sxc
 * @returns {}
 */
function prepareToAddContent(sxc, useModuleList) {
    var isCreated = sxc.manage._editContext.ContentGroup.IsCreated;
    if (isCreated || !useModuleList)
        return $.when(null);
    // return persistTemplate(sxc, null);
    // let manage = sxc.manage;
    // let contentGroup = manage._editContext.ContentGroup;
    // let showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
    // let groupExistsAndTemplateUnchanged = !!contentGroup.HasContent; // && !showingAjaxPreview;
    var templateId = sxc.manage._editContext.ContentGroup.TemplateId;
    // template has not changed
    // if (groupExistsAndTemplateUnchanged) return $.when(null);
    // persist the template
    return updateTemplate(sxc, templateId, true);
}
exports.prepareToAddContent = prepareToAddContent;
/**
 * Update the template and adjust UI accordingly.
 * @param {*} sxc
 * @param {*} templateId
 * @param {*} forceCreate
 */
function updateTemplateFromDia(sxc, templateId, forceCreate) {
    var contentGroup = sxc.manage._editContext.ContentGroup;
    var showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
    // todo: should move things like remembering undo etc. back into the contentBlock state manager
    // or just reset it, so it picks up the right values again ?
    return updateTemplate(sxc, templateId, forceCreate)
        .then(function () {
        _2sxc__quickDialog_1.hide();
        // if it didn't have content, then it only has now...
        if (!contentGroup.HasContent)
            contentGroup.HasContent = forceCreate;
        // only reload on ajax, not on app as that was already re-loaded on the preview
        // necessary to show the original template again
        if (showingAjaxPreview)
            render_1.reloadAndReInitialize(sxc);
    });
}
exports.updateTemplateFromDia = updateTemplateFromDia;
/**
 * Update the template.
 */
function updateTemplate(sxc, templateId, forceCreate) {
    return contentBlock_webApiPromises_1.saveTemplate(sxc, templateId, forceCreate)
        .then(function (data, textStatus, xhr) {
        // error handling
        if (xhr.status !== 200)
            return alert('error - result not ok, was not able to create ContentGroup');
        if (!data)
            return;
        // fixes a special case where the guid is given with quotes (dependes on version of angularjs) issue #532
        var newGuid = data.replace(/[\",\']/g, '');
        if (console)
            console.log('created content group {' + newGuid + '}');
        sxc.manage._updateContentGroupGuid(newGuid);
    });
}
exports.updateTemplate = updateTemplate;
//# sourceMappingURL=contentBlock.templates.js.map