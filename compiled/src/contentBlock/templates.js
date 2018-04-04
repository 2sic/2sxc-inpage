"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quick_dialog_1 = require("../quick-dialog/quick-dialog");
var build_toolbars_1 = require("../toolbar/build-toolbars");
var render_1 = require("./render");
var web_api_promises_1 = require("./web-api-promises");
/**
 * prepare the instance so content can be added
 * this ensure the content-group has been created, which is required to add content
 * @param {ContextOfButton} context
 * @returns {any}
 */
function prepareToAddContent(context, useModuleList) {
    var isCreated = context.contentBlock.isCreated;
    if (isCreated || !useModuleList)
        return $.when(null);
    // return persistTemplate(sxc, null);
    // let manage = sxc.manage;
    // let contentGroup = manage._editContext.ContentGroup;
    // let showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
    // let groupExistsAndTemplateUnchanged = !!contentGroup.HasContent; // && !showingAjaxPreview;
    var templateId = context.contentBlock.templateId;
    // template has not changed
    // if (groupExistsAndTemplateUnchanged) return $.when(null);
    // persist the template
    return updateTemplate(context, templateId, true);
}
exports.prepareToAddContent = prepareToAddContent;
/**
 * Update the template and adjust UI accordingly.
 * @param {ContextOfButton} context
 * @param {number} templateId
 * @param {boolean} forceCreate
 */
function updateTemplateFromDia(context, templateId, forceCreate) {
    var showingAjaxPreview = build_toolbars_1.isDisabled(context.sxc);
    // todo: should move things like remembering undo etc. back into the contentBlock state manager
    // or just reset it, so it picks up the right values again ?
    return updateTemplate(context, templateId, forceCreate)
        .then(function () {
        quick_dialog_1.hide();
        // if it didn't have content, then it only has now...
        if (!context.app.hasContent) {
            context.app.hasContent = forceCreate;
        }
        // only reload on ajax, not on app as that was already re-loaded on the preview
        // necessary to show the original template again
        if (showingAjaxPreview) {
            render_1.reloadAndReInitialize(context);
        }
    });
}
exports.updateTemplateFromDia = updateTemplateFromDia;
/**
 * Update the template.
 */
function updateTemplate(context, templateId, forceCreate) {
    return web_api_promises_1.saveTemplate(context, templateId, forceCreate)
        .then(function (data, textStatus, xhr) {
        // error handling
        if (xhr.status !== 200) {
            return alert('error - result not ok, was not able to create ContentGroup');
        }
        if (!data) {
            return;
        }
        // fixes a special case where the guid is given with quotes (depends on version of angularjs) issue #532
        var newGuid = data.replace(/[\",\']/g, '');
        if (console) {
            console.log("created content group {" + newGuid + "}");
        }
        context.contentBlock.contentGroupId = newGuid;
        // $2sxc._manage._updateContentGroupGuid(context, newGuid);
    });
}
exports.updateTemplate = updateTemplate;
//# sourceMappingURL=templates.js.map