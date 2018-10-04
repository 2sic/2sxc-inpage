import Iframebridge = require('./iframe-bridge');


/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
const resizeInterval: number = 200;
let resizeWatcher: any = null;
let isFullscreen: boolean = false;

const containerClass = 'inpage-frame-wrapper';
const iframeClass = 'inpage-frame';

/**
 * get the current container
 * @returns {element} html element of the div
 */
export function getOrCreateContainer(): any {
  const container = $(`.${containerClass}`);
  return container.length > 0 ? container : buildContainerAndIFrame();
}

/**
 * find the iframe which hosts the dialog
 * @param {html} [container] - html-container as jQuery object
 * @returns {html} iframe object
 */
export function getIFrame(container?: any): any {
  if (!container) container = getOrCreateContainer();
  return container.find('iframe')[0];
}


/**
 * build the container in the dom w/iframe for re-use
 * @return {jquery} jquery dom-object
 */
function buildContainerAndIFrame(): JQuery {
  const container = $(`<div class="${containerClass}"><div class="${iframeClass}"></div></div>`);
  let newIFrame: any = document.createElement('iframe');
  newIFrame = Iframebridge.connectIframeToSxcInstance(newIFrame);
  container.find(`.${iframeClass}`).html(newIFrame);
  $('body').append(container);

  watchForResize();
  return container;
}

/**
 * set container css for size
 * @param {boolean} fullScreen
 */
export function setSize(fullScreen: boolean): void {
  const container = getOrCreateContainer();
  // set container height
  container.css('min-height', fullScreen ? '100%' : '225px');
  isFullscreen = fullScreen;
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

  const cont: any = getOrCreateContainer();
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
    },
      resizeInterval);
  return resizeWatcher;
}
