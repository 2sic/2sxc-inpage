import { ContextOfButton } from '../context/context-of-button';
import { Dialog } from '../settings/dialog';
import Container = require('./container');

console.log('quick diag 2018-10-04 22:38');

/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
//const resizeInterval: number = 200;
//let resizeWatcher: any = null;
const diagShowClass: string = 'dia-select';
//let isFullscreen: boolean = false;

/**
 * dialog manager - the currently active dialog object
 */
// let diagManager = twoSxc._quickDialog = {}
let current: any = null;

export let quickDialog = {
  hide: hide,
  showOrToggle: showOrToggle,
  isShowing: () => current != null,
}

export let quickDialogInternals = {
  toggle: toggle
}

/**
 * toggle visibility
 * @param {boolean} [show] true/false optional
 */
function toggle(show: boolean): void {
  const cont = $(Container.getOrCreateContainer());
  if (show === undefined)
    show = !cont.hasClass(diagShowClass);
  // show/hide visually
  cont.toggleClass(diagShowClass, show);
  current = show ? Container.getIFrame() : null;
}

function hide(): void {
  if (current) toggle(false);
}


//const containerClass = 'inpage-frame-wrapper';
//const iframeClass = 'inpage-frame';

///**
// * get the current container
// * @returns {element} html element of the div
// */
//function getOrCreateContainer(): any {
//  const container = $(`.${containerClass}`);
//  return container.length > 0 ? container : buildContainerAndIFrame();
//}

///**
// * find the iframe which hosts the dialog
// * @param {html} [container] - html-container as jQuery object
// * @returns {html} iframe object
// */
//function getIFrame(container?: any): any {
//  if (!container) container = getOrCreateContainer();
//  return container.find('iframe')[0];
//}

/**
 * check if the dialog is showing for the current sxc-instance
 * @param {ContextOfButton} context object
 * @param {string} dialogName - name of dialog
 * @returns {boolean} true if it's currently showing for this sxc-instance
 */
function isShowing(context: ContextOfButton, dialogName: string): boolean {
  return current // there is a current dialog
    && current.sxcCacheKey === context.sxc.cacheKey // the iframe is showing for the current sxc
    && current.dialogName === dialogName; // the view is the same as previously
}

/**
 * show / reset the current iframe to use new url and callback
 * @param {ContextOfButton} context object
 * @param {string} url - url to show
 * @param {function()} closeCallback - callback event
 * @param {boolean} fullScreen - if it should open full screen
 * @param {string} [dialogName] - optional name of dialog, to check if it's already open
 * @returns {any} jquery object of the iframe
 */
function showOrToggle(context: ContextOfButton,
  url: string,
  closeCallback: any,
  fullScreen: boolean,
  dialogName: string): any
{
  Container.setSize(fullScreen);
  const iFrame: any = Container.getIFrame();

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


///**
// * build the container in the dom w/iframe for re-use
// * @return {jquery} jquery dom-object
// */
//function buildContainerAndIFrame(): any {
//  const container = $(`<div class="${containerClass}"><div class="${iframeClass}"></div></div>`);
//  let newIFrame: any = document.createElement('iframe');
//  newIFrame = Iframebridge.connectIframeToSxcInstance(newIFrame);
//  container.find(`.${iframeClass}`).html(newIFrame);
//  $('body').append(container);

//  watchForResize();
//  return container;
//}

///**
// * set container css for size
// * @param {boolean} fullScreen
// */
//function setSize(fullScreen: boolean): void {
//  const container = getOrCreateContainer();
//  // set container height
//  container.css('min-height', fullScreen ? '100%' : '225px');
//  isFullscreen = fullScreen;
//}


/**
 * rewrite the url to fit the quick-dialog situation
 * optionally with a live-compiled version from ng-serve
 * @param {string} url - original url pointing to the "wrong" dialog
 * @returns {string} new url
 */
function rewriteUrl(url: string): string {
  // change default url-schema from the primary angular-app to the quick-dialog
  url = url.replace(Dialog.ng1, Dialog.quickDialog)
    .replace(Dialog.ng5, Dialog.quickDialog);
  // special debug-code when running on local ng-serve
  // this is only activated if the developer manually sets a value in the localStorage
  try {
    const devMode = localStorage.getItem('devMode');
    if (devMode && ~~devMode) {
      url = url.replace('/desktopmodules/tosic_sexycontent/dist/ng/ui.html', 'http://localhost:4200');
    }

  } catch (e) {
    // ignore
  }
  return url;
}

///**
// * create watcher which monitors the iframe size and adjusts the container as needed
// * @param {boolean} [keepWatching] optional true/false to start/stop the watcher
// * @returns {null} nothing
// */
//function watchForResize(keepWatching?: boolean): any {
//  if ((keepWatching === null || keepWatching === false) && resizeWatcher) {
//    clearInterval(resizeWatcher);
//    resizeWatcher = null;
//    return null;
//  }

//  const cont: any = getOrCreateContainer();
//  if (!resizeWatcher) // only add a timer if not already running
//    resizeWatcher = setInterval(() => {
//      try {
//        const frm: any = getIFrame(cont);
//        if (!frm) return;
//        const height: number = frm.contentDocument.body.offsetHeight;
//        if (frm.previousHeight === height) return;
//        frm.style.minHeight = cont.css('min-height');
//        frm.style.height = height + 'px';
//        frm.previousHeight = height;
//        if (isFullscreen) {
//          frm.style.height = '100%';
//          frm.style.position = 'absolute';
//        }
//      } catch (e) {
//        // ignore
//      }
//    },
//      resizeInterval);
//  return resizeWatcher;
//}
