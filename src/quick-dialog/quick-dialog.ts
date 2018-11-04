import QuickEditState = require('./state');
import { ContextOfButton } from '../context/context-of-button';
import Container = require('./container');
import ContainerSize = require('./container-size');
import UrlHandler = require('./url-handler');
import DialogFrameElement = require('./iDialogFrameElement');
import IDialogFrameElement = DialogFrameElement.IDialogFrameElement;
import Iframe = require('./iframe');
import DialogIFrame = Iframe.IFrameBridge;
import { DebugConfig } from '../DebugConfig';

const dbg = DebugConfig.qDialog;
const diagShowClass: string = 'dia-select';

/** dialog manager - the currently active dialog object */
let current: IDialogFrameElement = null;

/**
 * this is a dialog manager which is in charge of all quick-dialogues
 * it always has a reference to the latest dialog created by any module instance
 */
class QuickDialogManager {
  /** 
   * Determines if any dialog is currently showing
   */
  isVisible() {
    return current != null;
  };

  /**
   * toggle visibility
   * @param {boolean} [show] true/false optional
   */
  setVisible(show: boolean): void {
    const cont = Container.getOrCreate();
    //if (show === undefined)
    //  show = !cont.hasClass(diagShowClass);
    // show/hide visually
    cont.toggleClass(diagShowClass, show);
    this.rememberDialogState(Container.getIFrame(cont), show);
    current = show ? Container.getIFrame() : null;
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
  showOrToggleFromToolbar(context: ContextOfButton,
    url: string,
    fullScreen: boolean,
    dialogName: string): Promise<boolean> {
    ContainerSize.setSize(fullScreen);
    const iFrame = Container.getIFrame();

    // in case it's a toggle
    if (this.isVisible()) {
      // check if we're just toggling the current, or will show a new one afterwards
      const currentPromise = dialogName && this.isShowingContext(context, dialogName)
        ? this.promise
        : null;
      this.cancel(current.bridge);
      // just a hide this, return the old promise
      if (currentPromise) return currentPromise;
    }

    const dialogUrl = UrlHandler.rewriteUrl(url);
    iFrame.bridge.setup(context.sxc, dialogName);
    iFrame.setAttribute('src', dialogUrl);
    // if the window had already been loaded, re-init
    if (iFrame.contentWindow && (iFrame.contentWindow as any).reboot)
      (iFrame.contentWindow as any).reboot();

    // make sure it's visible'
    this.setVisible(true);
    return this.promiseRestart();
  }

  cancel(bridge: DialogIFrame) {
    this.setVisible(false);
    QuickEditState.cancelled.set('true');
    this.resolvePromise(bridge.changed);

  }


  private rememberDialogState(iframe: IDialogFrameElement, state: boolean): void {
    if (dbg.showHide) console.log(`qDialog persistDia(..., ${state})`);
    if (state) {
      const cbId = (iframe.bridge as DialogIFrame).getContext().contentBlock.id.toString();
      if (dbg.showHide) console.log(`contentBlockId: ${cbId})`);
      return QuickEditState.cbId.set(cbId);
    } else
      return QuickEditState.cbId.remove();
  }

  /**
 * check if the dialog is showing for the current sxc-instance
 * @param {ContextOfButton} context object
 * @param {string} dialogName - name of dialog
 * @returns {boolean} true if it's currently showing for this sxc-instance
 */
  private isShowingContext(context: ContextOfButton, dialogName: string): boolean {
    return current // there is a current dialog

      //todo next: unclear where thes should be set, probably move to bridge?
      && current.bridge.sxcCacheKey === context.sxc.cacheKey // the iframe is showing for the current sxc
      && current.bridge.dialogName === dialogName; // the view is the same as previously
  }


  //#region promise handling
  private promise: Promise<boolean>;
  private resolvePromise: (value?: boolean) => void;
  private promiseRestart(): Promise<boolean> {
    this.promise = new Promise<boolean>(resolve => this.resolvePromise = resolve);
    return this.promise;
  }
  //#endregion
}


export let quickDialog = new QuickDialogManager();