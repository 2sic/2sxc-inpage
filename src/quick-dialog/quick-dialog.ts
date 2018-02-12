﻿import { _contentBlock } from '../contentBlock/main-content-block';
import { ajaxLoad, reloadAndReInitialize, showMessage } from '../contentBlock/render';
import { updateTemplateFromDia } from '../contentBlock/templates';
import { getTag } from '../manage/api';

/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */

const resizeInterval: number = 200;
const scrollTopOffset: number = 80;
let resizeWatcher = null;
const diagShowClass: string = 'dia-select';
let isFullscreen: boolean = false;

/**
 * dialog manager - the currently active dialog object
 */
// let diagManager = twoSxc._quickDialog = {}
export let current: any = null;

/**
 * toggle visibility
 * @param {boolean} [show] true/false optional
 */
export function toggle(show: boolean): void {
  const cont = $(getContainer());
  if (show === undefined)
    show = !cont.hasClass(diagShowClass);
  // show/hide visually
  cont.toggleClass(diagShowClass, show);
  current = show ? getIFrame() : null;
}

export function hide(): void {
  if (current) toggle(false);
}

/**
 * cancel the current dialog
 */
export function cancel(): void {
  if (current) current.cancel(); // cancel & hide
}

/**
 * Remember dialog state across page-reload
 * @param {Object<any>} sxc - the sxc which is persisted for
 */
export function persistDialog(sxc: SxcInstanceWithInternals): void {
  sessionStorage.setItem('dia-cbid', sxc.cbid.toString());
}

/**
 * get the current container
 * @returns {element} html element of the div
 */
export function getContainer(): any {
  const container = $('.inpage-frame-wrapper');
  return container.length > 0 ? container : buildContainerAndIFrame();
}

/**
 * find the iframe which hosts the dialog
 * @param {html} [container] - html-container as jQuery object
 * @returns {html} iframe object
 */
export function getIFrame(container?: any): any {
  if (!container) container = getContainer();
  return container.find('iframe')[0];
}

/**
 * check if the dialog is showing for the current sxc-instance
 * @param {Object<any>} sxc - sxc object
 * @param {string} dialogName - name of dialog
 * @returns {boolean} true if it's currently showing for this sxc-instance
 */
export function isShowing(sxc: SxcInstanceWithInternals, dialogName: string): any {
  return current // there is a current dialog
    && current.sxcCacheKey === sxc.cacheKey // the iframe is showing for the current sxc
    && current.dialogName === dialogName; // the view is the same as previously
}

/**
 * show / reset the current iframe to use new url and callback
 * @param {any} sxc - sxc object
 * @param {string} url - url to show
 * @param {function()} closeCallback - callback event
 * @param {boolean} fullScreen - if it should open full screen
 * @param {string} [dialogName] - optional name of dialog, to check if it's already open
 * @returns {any} jquery object of the iframe
 */
export function showOrToggle(sxc: SxcInstanceWithInternals, url: string, closeCallback: any, fullScreen: boolean, dialogName: string): any {
  setSize(fullScreen);
  const iFrame: any = getIFrame();

  // in case it's a toggle
  if (dialogName && isShowing(sxc, dialogName))
    return hide();

  iFrame.rewire(sxc, closeCallback, dialogName);
  iFrame.setAttribute('src', rewriteUrl(url));
  // if the window had already been loaded, re-init
  if (iFrame.contentWindow && iFrame.contentWindow.reboot)
    iFrame.contentWindow.reboot();

  // make sure it's visible'
  iFrame.toggle(true);
  return iFrame;
}


/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame(): any {
  const container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>');
  let newIFrame: any = document.createElement('iframe');
  newIFrame = extendIFrameWithSxcState(newIFrame);
  container.find('.inpage-frame').html(newIFrame);
  $('body').append(container);

  watchForResize();
  return container;
}

function setSize(fullScreen: boolean): void {
  const container = getContainer();
  // set container height
  container.css('min-height', fullScreen ? '100%' : '225px');
  isFullscreen = fullScreen;
}

function extendIFrameWithSxcState(iFrame) {
  let hiddenSxc = null;
  // ReSharper disable once UnusedLocals
  const cbApi = _contentBlock;
  let tagModule = null;

  /**
   * get the sxc-object of this iframe
   * @returns {Object<any>} refreshed sxc-object
   */
  function reSxc(): SxcInstanceWithInternals {
    if (!hiddenSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
    return hiddenSxc.recreate();
  }

  const newFrm: any = Object.assign(iFrame, {
    closeCallback: null,
    rewire: (sxc: SxcInstanceWithInternals, callback: any, dialogName: string) => {
      hiddenSxc = sxc;
      tagModule = $($(getTag(sxc)).parent().eq(0));
      newFrm.sxcCacheKey = sxc.cacheKey;
      newFrm.closeCallback = callback;
      if (dialogName) newFrm.dialogName = dialogName;
    },
    getManageInfo: () => reSxc().manage._dialogParameters,
    getAdditionalDashboardConfig: () => reSxc().manage._quickDialogConfig,
    persistDia: () => persistDialog(reSxc()),
    scrollToTarget: () => {
      $('body').animate({
        scrollTop: tagModule.offset().top - scrollTopOffset,
    });
    },
    toggle: (show: boolean) => toggle(show),
    cancel: () => {
      newFrm.toggle(false);
      // todo: only re-init if something was changed?
      // return cbApi.reloadAndReInitialize(reSxc());

      // cancel the dialog
      localStorage.setItem('cancelled-dialog', 'true');
      return newFrm.closeCallback();
    },
    run: (verb: string) => reSxc().manage.run(verb),
    showMessage: (message: string) => showMessage(reSxc(), `<p class="no-live-preview-available">${message}</p>`),
    reloadAndReInit: () => reloadAndReInitialize(reSxc(), true, true),
    saveTemplate: (templateId: number) => updateTemplateFromDia(reSxc(), templateId, false),
    previewTemplate: (templateId: number) => ajaxLoad(reSxc(), templateId, true),
  });
  return newFrm;
}

/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the "wrong" dialog
 * @returns {string} new url
 */
function rewriteUrl(url: string): string {
  // change default url-schema from the primary angular-app to the quick-dialog
  url = url.replace('dist/dnn/ui.html?', 'dist/ng/ui.html?');

  // special debug-code when running on local ng-serve
  // this is only activated if the developer manually sets a value in the localStorage
  try {
    const devMode = localStorage.getItem('devMode');
    if (devMode && ~~devMode)
      url = url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
  } catch (e) {
    // ignore
  }
  return url;
}

/**
 * create watcher which monitors the iframe size and adjusts the container as needed
 * @param {boolean} [keepWatching] optional true/false to start/stop the watcher
 * @returns {null} nothing
 */
function watchForResize(keepWatching?: boolean): any {
  if ((keepWatching === null || keepWatching === false) && resizeWatcher) {
    clearInterval(resizeWatcher);
    resizeWatcher = null;
    return null;
  }

  const cont: any = getContainer();
  if (!resizeWatcher) // only add a timer if not already running
    resizeWatcher = setInterval(() => {
      try {
        const frm: any = getIFrame(cont);
        if (!frm) return;
        const height: number = frm.contentDocument.body.offsetHeight;
        if (frm.previousHeight === height) return;
        frm.style.minHeight = cont.css('min-height');
        frm.style.height = height + 'px';
        frm.previousHeight = height;
        if (isFullscreen) {
          frm.style.height = '100%';
          frm.style.position = 'absolute';
        }
      } catch (e) {
        // ignore
      }
    }, resizeInterval);
  return resizeWatcher;
}
