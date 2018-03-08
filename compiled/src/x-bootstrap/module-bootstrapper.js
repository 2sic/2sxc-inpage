"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var api_1 = require("../manage/api");
var quick_dialog_1 = require("../quick-dialog/quick-dialog");
var build_toolbars_1 = require("../toolbar/build-toolbars");
var _2sxc_translate_1 = require("../translate/2sxc.translate");
var sxc_1 = require("./sxc");
// import '/2sxc-api/js/2sxc.api';
/**
 * module & toolbar bootstrapping (initialize all toolbars after loading page)
 * this will run onReady...
 */
var initializedModules = [];
var openedTemplatePickerOnce = false;
var cancelledDialog = localStorage.getItem('cancelled-dialog');
if (cancelledDialog)
    localStorage.removeItem('cancelled-dialog');
initAllModules(true);
// watch for ajax reloads on edit or view-changes, to re-init the toolbars etc.
// ReSharper disable once UnusedParameter
document.body.addEventListener('DOMSubtreeModified', function (event) { return initAllModules(false); }, false);
// return; // avoid side-effects
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
    if (quick_dialog_1.current !== null)
        return false;
    // not exactly one uninitialized module
    if (uninitializedModules.length !== 1)
        return false;
    // show the template picker of this module
    var module = uninitializedModules.parent('div[data-edit-context]')[0];
    var sxc = sxc_1.getSxcInstance(module);
    sxc.manage.run2(context_1.context(module), 'layout');
    openedTemplatePickerOnce = true;
    return true;
}
function initModule(module, isFirstRun) {
    // check if module is already in the list of initialized modules
    if (initializedModules.find(function (m) { return m === module; }))
        return false;
    // add to modules-list
    initializedModules.push(module);
    var sxc = sxc_1.getSxcInstance(module);
    // check if the sxc must be re-created. This is necessary when modules are dynamically changed
    // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
    if (!isFirstRun)
        sxc = sxc.recreate(true);
    // check if we must show the glasses
    // this must run even after first-run, because it can be added ajax-style
    var wasEmpty = showGlassesButtonIfUninitialized(sxc);
    if (isFirstRun || !wasEmpty)
        build_toolbars_1.buildToolbars(module);
    return true;
}
function showGlassesButtonIfUninitialized(sxci) {
    // already initialized
    if (sxci.manage._editContext.ContentGroup.TemplateId !== 0)
        return false;
    // already has a glasses button
    var tag = $(api_1.getTag(sxci));
    if (tag.find('.sc-uninitialized').length !== 0)
        return false;
    // note: title is added on mouseover, as the translation isn't ready at page-load
    var btn = $('<div class="sc-uninitialized" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');
    btn.on('click', function () {
        sxci.manage.run2(context_1.context(tag), 'layout');
    });
    btn.on('mouseover', function () {
        btn.title = _2sxc_translate_1.translate(btn.title);
    });
    tag.append(btn);
    return true;
}
//# sourceMappingURL=module-bootstrapper.js.map