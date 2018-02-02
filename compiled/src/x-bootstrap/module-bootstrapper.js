"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _2sxc__quickDialog_1 = require("../quick-dialog/2sxc._quickDialog");
var manage_api_1 = require("../manage/manage.api");
var _2sxc_translate_1 = require("../translate/2sxc.translate");
//import '/2sxc-api/js/2sxc.api';
/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
// 
// 
exports.$2sxc = window.$2sxc;
var initializedModules = [];
var openedTemplatePickerOnce = false;
var cancelledDialog = localStorage.getItem('cancelled-dialog');
if (cancelledDialog)
    localStorage.removeItem('cancelled-dialog');
initAllModules(true);
// watch for ajax reloads on edit or view-changes, to re-init the toolbars etc.
document.body.addEventListener('DOMSubtreeModified', function (event) { return initAllModules(false); }, false);
//return; // avoid side-effects
function initAllModules(isFirstRun) {
    $('div[data-edit-context]').each(function () {
        initModule(this, isFirstRun);
    });
    tryShowTemplatePicker();
}
/**
 * Show the template picker if
 * - template picker has not yet been opened
 * - dialog has not been cancelled
 * - only one uninitialized module on page
 * @returns
 */
function tryShowTemplatePicker() {
    var uninitializedModules = $('.sc-uninitialized');
    if (cancelledDialog || openedTemplatePickerOnce)
        return false;
    // already showing a dialog
    if (_2sxc__quickDialog_1.current !== null)
        return false;
    // not exactly one uninitialized module
    if (uninitializedModules.length !== 1)
        return false;
    // show the template picker of this module
    var module = uninitializedModules.parent('div[data-edit-context]')[0];
    exports.$2sxc(module).manage.run('layout');
    openedTemplatePickerOnce = true;
}
function initModule(module, isFirstRun) {
    // check if module is already in the list of initialized modules
    if (initializedModules.find(function (m) { return m === module; }))
        return false;
    // add to modules-list
    initializedModules.push(module);
    exports.sxc = exports.$2sxc(module);
    // check if the sxc must be re-created. This is necessary when modules are dynamically changed
    // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
    if (!isFirstRun)
        exports.sxc = exports.sxc.recreate(true);
    // check if we must show the glasses
    // this must run even after first-run, because it can be added ajax-style
    var wasEmpty = showGlassesButtonIfUninitialized(exports.sxc);
    if (isFirstRun || !wasEmpty)
        exports.$2sxc._toolbarManager.buildToolbars(module);
    return true;
}
function showGlassesButtonIfUninitialized(sxc) {
    // already initialized
    if (sxc.manage._editContext.ContentGroup.TemplateId !== 0)
        return false;
    // already has a glasses button
    var tag = $(manage_api_1.getTag(sxc));
    if (tag.find('.sc-uninitialized').length !== 0)
        return false;
    // note: title is added on mouseover, as the translation isn't ready at page-load
    var btn = $('<div class="sc-uninitialized" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');
    btn.on('click', function () {
        sxc.manage.run('layout');
    });
    btn.on('mouseover', function () {
        btn.title = _2sxc_translate_1.translate(btn.title);
    });
    tag.append(btn);
    return true;
}
//# sourceMappingURL=module-bootstrapper.js.map