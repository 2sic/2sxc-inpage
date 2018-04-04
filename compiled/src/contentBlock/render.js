"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var api_1 = require("../manage/api");
var quick_dialog_1 = require("../quick-dialog/quick-dialog");
var start_1 = require("../quick-edit/start");
var build_toolbars_1 = require("../toolbar/build-toolbars");
var main_content_block_1 = require("./main-content-block");
var web_api_promises_1 = require("./web-api-promises");
/*
 * this is the content block manager in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
/**
 * ajax update/replace the content of the content-block
 * optionally also initialize the toolbar (if not just preview)
 * @param {ContextOfButton} context
 * @param {string} newContent
 * @param {boolean} justPreview
 * @returns {}
 */
function replaceCb(context, newContent, justPreview) {
    try {
        var newStuff = $(newContent);
        // Must disable toolbar before we attach to DOM
        if (justPreview)
            build_toolbars_1.disable(newStuff);
        $(api_1.getTag(context.sxc)).replaceWith(newStuff);
        // reset the cache, so the sxc-object is refreshed
        context.sxc.recreate(true);
    }
    catch (e) {
        console.log('Error while rendering template:', e);
    }
}
/**
 * Show a message where the content of a module should be - usually as placeholder till something else happens
 * @param {ContextOfButton} context
 * @param {string} newContent
 * @returns {} nothing
 */
function showMessage(context, newContent) {
    $(api_1.getTag(context.sxc)).html(newContent);
}
exports.showMessage = showMessage;
/**
 * ajax-call, then replace
 * @param {ContextOfButton} context
 * @param {number} alternateTemplateId
 * @param {boolean} justPreview
 */
function ajaxLoad(context, alternateTemplateId, justPreview) {
    return web_api_promises_1.getPreviewWithTemplate(context, alternateTemplateId)
        .then(function (result) { return replaceCb(context, result, justPreview); })
        .then(start_1.reset); // reset quick-edit, because the config could have changed
}
exports.ajaxLoad = ajaxLoad;
/**
 * this one assumes a replace / change has already happened, but now must be finalized...
 * @param {ContextOfButton} context
 * @param {boolean} forceAjax
 * @param {boolean} preview
 */
function reloadAndReInitialize(context, forceAjax, preview) {
    // if ajax is not supported, we must reload the whole page
    if (!forceAjax && !context.app.supportsAjax) {
        return window.location.reload();
    }
    // ReSharper disable once DoubleNegationOfBoolean
    return ajaxLoad(context, main_content_block_1.MainContentBlock.cUseExistingTemplate, !!preview)
        .then(function () {
        // tell Evoq that page has changed if it has changed (Ajax call)
        if (window.dnn_tabVersioningEnabled)
            try {
                window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
            }
            catch (e) {
                // sink
            }
        // maybe check if already publish
        // compare to HTML module
        // if (publishing is required (FROM CONTENT BLOCK) and publish button not visible) show publish button
        // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
        // must check for side-effects, which would need the manager to re-build the configuration
        quick_dialog_1.hide();
    });
}
exports.reloadAndReInitialize = reloadAndReInitialize;
//# sourceMappingURL=render.js.map