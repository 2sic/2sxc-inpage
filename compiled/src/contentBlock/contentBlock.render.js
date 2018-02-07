"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE_start_1 = require("../quick-edit/$quickE.start");
var _2sxc__quickDialog_1 = require("../quick-dialog/2sxc._quickDialog");
var manage_api_1 = require("../manage/manage.api");
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
var main_content_block_1 = require("./main-content-block");
var contentBlock_webApiPromises_1 = require("./contentBlock.webApiPromises");
/*
 * this is the content block manager in the browser
 *
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
/**
 * ajax update/replace the content of the content-block
 * optionally also initialze the toolbar (if not just preview)
 * @param {Object<>} sxc
 * @param {string} newContent
 * @param {boolean} justPreview
 * @returns {}
 */
function replaceCb(sxc, newContent, justPreview) {
    try {
        var newStuff = $(newContent);
        // Must disable toolbar before we attach to DOM
        if (justPreview)
            module_bootstrapper_1.$2sxc._toolbarManager.disable(newStuff);
        $(manage_api_1.getTag(sxc)).replaceWith(newStuff);
        // reset the cache, so the sxc-object is refreshed
        sxc.recreate(true);
    }
    catch (e) {
        console.log('Error while rendering template:', e);
    }
}
;
/**
 * Show a message where the content of a module should be - usually as placeholder till something else happens
 * @param {object} sxc
 * @param {string} newContent
 * @returns {} - nothing
 */
function showMessage(sxc, newContent) {
    $(manage_api_1.getTag(sxc)).html(newContent);
}
exports.showMessage = showMessage;
;
/**
 * ajax-call, then replace
 * @param sxc
 * @param alternateTemplateId
 * @param justPreview
 */
function ajaxLoad(sxc, alternateTemplateId, justPreview) {
    return contentBlock_webApiPromises_1.getPreviewWithTemplate(sxc, alternateTemplateId)
        .then(function (result) { return replaceCb(sxc, result, justPreview); })
        .then(_quickE_start_1.reset); // reset quick-edit, because the config could have changed
}
exports.ajaxLoad = ajaxLoad;
;
/**
 * this one assumes a replace / change has already happened, but now must be finalized...
 * @param sxc
 * @param forceAjax
 * @param preview
 */
function reloadAndReInitialize(sxc, forceAjax, preview) {
    var manage = sxc.manage;
    // if ajax is not supported, we must reload the whole page
    if (!forceAjax && !manage._reloadWithAjax)
        return window.location.reload();
    return ajaxLoad(sxc, main_content_block_1._contentBlock.cUseExistingTemplate, !!preview)
        .then(function () {
        // tell Evoq that page has changed if it has changed (Ajax call)
        if (window.dnn_tabVersioningEnabled)
            try {
                window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
            }
            catch (e) { }
        // maybe check if already publish
        // compare to HTML module
        // if (publishing is required (FROM CONTENT BLOCK) and publish button not visible) show publish button
        // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
        // must check for side-effects, which would need the manager to re-build the configuration
        _2sxc__quickDialog_1.hide();
    });
}
exports.reloadAndReInitialize = reloadAndReInitialize;
;
//# sourceMappingURL=contentBlock.render.js.map