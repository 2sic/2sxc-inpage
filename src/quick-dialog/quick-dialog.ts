import QuickEditState = require('./state');
import { ContextOfButton } from '../context/context-of-button';
import Container = require('./container');
import ContainerSize = require('./container-size');
import UrlHandler = require('./url-handler');
import DialogFrameElement = require('./iDialogFrameElement');
import IDialogFrameElement = DialogFrameElement.IDialogFrameElement;
import Iframe = require('./iframe');
import DialogIFrame = Iframe.DialogIFrame;
import { DebugConfig } from '../DebugConfig';

const dbg = DebugConfig.qDialog;

/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
const diagShowClass: string = 'dia-select';

/**
 * dialog manager - the currently active dialog object
 */
let current: IDialogFrameElement = null;

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
  const cont = Container.getOrCreate();
  if (show === undefined)
    show = !cont.hasClass(diagShowClass);
  // show/hide visually
  cont.toggleClass(diagShowClass, show);
  persistDia(Container.getIFrame(cont), show);
  current = show ? Container.getIFrame() : null;
}

function persistDia(iframe: IDialogFrameElement, state: boolean): void {
  if (dbg.showHide) console.log(`qDialog persistDia(..., ${state})`);
  if (state) {
    const cbId = (iframe.bridge as DialogIFrame).getContext().contentBlock.id.toString();
    if (dbg.showHide) console.log(`contentBlockId: ${cbId})`);
    return QuickEditState.cbId.set(cbId);
  } else
    return QuickEditState.cbId.remove();
}

function hide(): void {
  if (current) toggle(false);
}

/**
 * check if the dialog is showing for the current sxc-instance
 * @param {ContextOfButton} context object
 * @param {string} dialogName - name of dialog
 * @returns {boolean} true if it's currently showing for this sxc-instance
 */
function isShowing(context: ContextOfButton, dialogName: string): boolean {
  return current // there is a current dialog

    //todo next: unclear where thes should be set, probably move to bridge?
    && current.bridge.sxcCacheKey === context.sxc.cacheKey // the iframe is showing for the current sxc
    && current.bridge.dialogName === dialogName; // the view is the same as previously
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
  ContainerSize.setSize(fullScreen);
  const iFrame = Container.getIFrame();

  // in case it's a toggle
  if (dialogName && isShowing(context, dialogName)) {
    return hide();
  } 

  iFrame.bridge.rewire(context.sxc, closeCallback, dialogName);
  iFrame.setAttribute('src', UrlHandler.rewriteUrl(url));
  // if the window had already been loaded, re-init
  if (iFrame.contentWindow && (iFrame.contentWindow as any).reboot)
    (iFrame.contentWindow as any).reboot();

  // make sure it's visible'
  iFrame.bridge.toggle(true);
  return iFrame;
}
