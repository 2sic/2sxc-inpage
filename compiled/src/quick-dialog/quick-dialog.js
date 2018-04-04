"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_content_block_1 = require("../contentBlock/main-content-block");
var render_1 = require("../contentBlock/render");
var templates_1 = require("../contentBlock/templates");
var context_1 = require("../context/context");
var api_1 = require("../manage/api");
var quick_dialog_config_1 = require("../manage/quick-dialog-config");
var ng_dialog_params_1 = require("../manage/ng-dialog-params");
/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
var resizeInterval = 200;
var scrollTopOffset = 80;
var resizeWatcher = null;
var diagShowClass = 'dia-select';
var isFullscreen = false;
/**
 * dialog manager - the currently active dialog object
 */
// let diagManager = twoSxc._quickDialog = {}
exports.current = null;
/**
 * toggle visibility
 * @param {boolean} [show] true/false optional
 */
function toggle(show) {
    var cont = $(getContainer());
    if (show === undefined)
        show = !cont.hasClass(diagShowClass);
    // show/hide visually
    cont.toggleClass(diagShowClass, show);
    exports.current = show ? getIFrame() : null;
}
exports.toggle = toggle;
function hide() {
    if (exports.current)
        toggle(false);
}
exports.hide = hide;
/**
 * cancel the current dialog
 */
function cancel() {
    if (exports.current)
        exports.current.cancel(); // cancel & hide
}
exports.cancel = cancel;
/**
 * Remember dialog state across page-reload
 * @param {Object<any>} context - the sxc which is persisted for
 */
function persistDialog(context) {
    sessionStorage.setItem('dia-cbid', context.contentBlock.id.toString());
}
exports.persistDialog = persistDialog;
/**
 * get the current container
 * @returns {element} html element of the div
 */
function getContainer() {
    var container = $('.inpage-frame-wrapper');
    return container.length > 0 ? container : buildContainerAndIFrame();
}
exports.getContainer = getContainer;
/**
 * find the iframe which hosts the dialog
 * @param {html} [container] - html-container as jQuery object
 * @returns {html} iframe object
 */
function getIFrame(container) {
    if (!container)
        container = getContainer();
    return container.find('iframe')[0];
}
exports.getIFrame = getIFrame;
/**
 * check if the dialog is showing for the current sxc-instance
 * @param {ContextOfButton} context object
 * @param {string} dialogName - name of dialog
 * @returns {boolean} true if it's currently showing for this sxc-instance
 */
function isShowing(context, dialogName) {
    return exports.current // there is a current dialog
        &&
            exports.current.sxcCacheKey === context.sxc.cacheKey // the iframe is showing for the current sxc
        &&
            exports.current.dialogName === dialogName; // the view is the same as previously
}
exports.isShowing = isShowing;
/**
 * show / reset the current iframe to use new url and callback
 * @param {ContextOfButton} context object
 * @param {string} url - url to show
 * @param {function()} closeCallback - callback event
 * @param {boolean} fullScreen - if it should open full screen
 * @param {string} [dialogName] - optional name of dialog, to check if it's already open
 * @returns {any} jquery object of the iframe
 */
function showOrToggle(context, url, closeCallback, fullScreen, dialogName) {
    setSize(fullScreen);
    var iFrame = getIFrame();
    // in case it's a toggle
    if (dialogName && isShowing(context, dialogName)) {
        return hide();
    }
    iFrame.rewire(context.sxc, closeCallback, dialogName);
    iFrame.setAttribute('src', rewriteUrl(url));
    // if the window had already been loaded, re-init
    if (iFrame.contentWindow && iFrame.contentWindow.reboot)
        iFrame.contentWindow.reboot();
    // make sure it's visible'
    iFrame.toggle(true);
    return iFrame;
}
exports.showOrToggle = showOrToggle;
/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame() {
    var container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>');
    var newIFrame = document.createElement('iframe');
    newIFrame = extendIFrameWithSxcState(newIFrame);
    container.find('.inpage-frame').html(newIFrame);
    $('body').append(container);
    watchForResize();
    return container;
}
/**
 * set container css for size
 * @param {boolean} fullScreen
 */
function setSize(fullScreen) {
    var container = getContainer();
    // set container height
    container.css('min-height', fullScreen ? '100%' : '225px');
    isFullscreen = fullScreen;
}
/**
 * extend IFrame with Sxc state
 * @param iFrame
 */
function extendIFrameWithSxcState(iFrame) {
    var hiddenSxc = null;
    // ReSharper disable once UnusedLocals
    var cbApi = main_content_block_1._contentBlock;
    var tagModule = null;
    /**
     * get the sxc-object of this iframe
     * @returns {Object<any>} refreshed sxc-object
     */
    function reSxc() {
        if (!hiddenSxc)
            throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
        return hiddenSxc.recreate();
    }
    function getContext() {
        return context_1.context(api_1.getTag(reSxc()));
    }
    var newFrm = Object.assign(iFrame, {
        closeCallback: null,
        rewire: function (sxc, callback, dialogName) {
            hiddenSxc = sxc;
            tagModule = $($(api_1.getTag(sxc)).parent().eq(0));
            newFrm.sxcCacheKey = sxc.cacheKey;
            newFrm.closeCallback = callback;
            if (dialogName)
                newFrm.dialogName = dialogName;
        },
        getManageInfo: function () { return ng_dialog_params_1.NgDialogParams.fromContext(reSxc().manage.context); },
        getAdditionalDashboardConfig: function () { return quick_dialog_config_1.QuickDialogConfig.fromContext(reSxc().manage.context); },
        persistDia: function () { return persistDialog(getContext()); },
        scrollToTarget: function () {
            $('body').animate({
                scrollTop: tagModule.offset().top - scrollTopOffset,
            });
        },
        toggle: function (show) { return toggle(show); },
        cancel: function () {
            newFrm.toggle(false);
            // todo: only re-init if something was changed?
            // return cbApi.reloadAndReInitialize(reSxc());
            // cancel the dialog
            localStorage.setItem('cancelled-dialog', 'true');
            return newFrm.closeCallback();
        },
        run: function (verb) { return reSxc().manage.run(verb); },
        showMessage: function (message) { return render_1.showMessage(getContext(), "<p class=\"no-live-preview-available\">" + message + "</p>"); },
        reloadAndReInit: function () { return render_1.reloadAndReInitialize(getContext(), true, true); },
        saveTemplate: function (templateId) { return templates_1.updateTemplateFromDia(getContext(), templateId, false); },
        previewTemplate: function (templateId) { return render_1.ajaxLoad(getContext(), templateId, true); },
    });
    return newFrm;
}
/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the "wrong" dialog
 * @returns {string} new url
 */
function rewriteUrl(url) {
    // change default url-schema from the primary angular-app to the quick-dialog
    url = url.replace('dist/dnn/ui.html?', 'dist/ng/ui.html?');
    // special debug-code when running on local ng-serve
    // this is only activated if the developer manually sets a value in the localStorage
    try {
        var devMode = localStorage.getItem('devMode');
        if (devMode && ~~devMode)
            url = url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
    }
    catch (e) {
        // ignore
    }
    return url;
}
/**
 * create watcher which monitors the iframe size and adjusts the container as needed
 * @param {boolean} [keepWatching] optional true/false to start/stop the watcher
 * @returns {null} nothing
 */
function watchForResize(keepWatching) {
    if ((keepWatching === null || keepWatching === false) && resizeWatcher) {
        clearInterval(resizeWatcher);
        resizeWatcher = null;
        return null;
    }
    var cont = getContainer();
    if (!resizeWatcher)
        resizeWatcher = setInterval(function () {
            try {
                var frm = getIFrame(cont);
                if (!frm)
                    return;
                var height = frm.contentDocument.body.offsetHeight;
                if (frm.previousHeight === height)
                    return;
                frm.style.minHeight = cont.css('min-height');
                frm.style.height = height + 'px';
                frm.previousHeight = height;
                if (isFullscreen) {
                    frm.style.height = '100%';
                    frm.style.position = 'absolute';
                }
            }
            catch (e) {
                // ignore
            }
        }, resizeInterval);
    return resizeWatcher;
}
//# sourceMappingURL=quick-dialog.js.map