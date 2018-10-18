import { ajaxLoad, reloadAndReInitialize, showMessage } from '../contentBlock/render';
import { updateTemplateFromDia } from '../contentBlock/templates';
import { context } from '../context/context';
import { getTag } from '../manage/api';
import { ContextOfButton } from '../context/context-of-button';
import { NgDialogParams } from '../manage/ng-dialog-params';
import { quickDialogInternals } from './quick-dialog';
import QuickEditState = require('./state');
import { IDialogFrameElement } from './iDialogFrameElement';
import { IIFrameExtensions } from './iiframe-extensions';
import { QuickDialogConfig } from './quick-dialog-config';

const scrollTopOffset: number = 80;
const animationTime: number = 400;

export function build(iFrame: HTMLIFrameElement): IDialogFrameElement {
  console.log('prot: ', DialogIFrame.prototype);
  const iFrameExtended = iFrame as IDialogFrameElement;
  iFrameExtended.bridge = new DialogIFrame();
  console.log('extensions: ', iFrameExtended.bridge);
  //const merged = Object.assign(iFrame, DialogIFrame.prototype) as IDialogFrameElement;
  //console.log('merged: ', merged);
  return iFrameExtended;// merged;
}

/**
 * 
 */
export class DialogIFrame implements IIFrameExtensions {

  sxcCacheKey: string;
  dialogName: string;

  /**
   * internal object to keep track of the sxc-instance
   */
  hiddenSxc: SxcInstanceWithInternals;

  /**
   * The html-tag of the current module
   */
  tagModule: JQuery<HTMLElement>;

  /**
   * get the sxc-object of this iframe
   * @returns {Object<any>} refreshed sxc-object
   */
  reSxc(): SxcInstanceWithInternals {
    if (!this.hiddenSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
    return this.hiddenSxc.recreate();
  }

  getContext(): ContextOfButton {
    return context(getTag(this.reSxc()));
  }


  getAdditionalDashboardConfig() {
    return QuickDialogConfig.fromContext(this.reSxc().manage.context);
  }

  persistDia() {
    return QuickEditState.cbId.set(this.getContext().contentBlock.id.toString());
  }

  toggle(show: boolean) {
    quickDialogInternals.toggle(show);
  }

  run(verb: string) {
    this.reSxc().manage.run(verb);
  }

  showMessage(message: string) {
    showMessage(this.getContext(), `<p class="no-live-preview-available">${message}</p>`);
  }

  reloadAndReInit() {
    return reloadAndReInitialize(this.getContext(), true, true);
  }

  saveTemplate(templateId: number) {
    return updateTemplateFromDia(this.getContext(), templateId, false);
  }

  previewTemplate(templateId: number) {
    return ajaxLoad(this.getContext(), templateId, true);
  }

  closeCallback() {};


  scrollToTarget() {
    $('body').animate({
        scrollTop: this.tagModule.offset().top - scrollTopOffset
      } as any,
      animationTime);
  };


  rewire(sxc: SxcInstanceWithInternals, callback: () => void, dialogName: string) {
    console.log('rewire with sxc: ', sxc);
    this.hiddenSxc = sxc;
    this.tagModule = $($(getTag(sxc)).parent().eq(0));
    this.sxcCacheKey = sxc.cacheKey;
    this.closeCallback = callback;
    if (dialogName) {
      this.dialogName = dialogName;
    }
  };

  cancel() {
    this.toggle(false);
    // todo: only re-init if something was changed?
    // return cbApi.reloadAndReInitialize(reSxc());
    // cancel the dialog
    QuickEditState.cancelled.set('true');
    this.closeCallback();
  };
}

///**
// * extend IFrame with Sxc state
// * @param iFrame
// */
//export function connectIframeToSxcInstance(iFrame: HTMLElement): IDialogFrameExtended {
//  //let hiddenSxc: SxcInstanceWithInternals = null;
//  //const cbApi = _contentBlock;
//  //let tagModule: JQuery<HTMLElement> = null;

//  const newFrm = Object.assign(
//    iFrame,
//    {
//      getAdditionalDashboardConfig: () => QuickDialogConfig.fromContext(reSxc().manage.context),
//      persistDia: () => QuickEditState.cbId.set(getContext().contentBlock.id.toString()),
//      toggle: (show: boolean) => quickDialogInternals.toggle(show),
//      run: (verb: string) => reSxc().manage.run(verb),
//      getManageInfo: () => NgDialogParams.fromContext(reSxc().manage.context),
//      showMessage: (message: string) => showMessage(getContext(), `<p class="no-live-preview-available">${message}</p>`),
//      reloadAndReInit: () => reloadAndReInitialize(getContext(), true, true),
//      saveTemplate: (templateId: number) => updateTemplateFromDia(getContext(), templateId, false),
//      previewTemplate: (templateId: number) => ajaxLoad(getContext(), templateId, true),
//      cancel: null,
//      closeCallback: null
//    },
//  ) as IDialogFrameExtended;

//  /**
//   * get the sxc-object of this iframe
//   * @returns {Object<any>} refreshed sxc-object
//   */
//  function reSxc(): SxcInstanceWithInternals {
//    if (!newFrm.hiddenSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
//    return newFrm.hiddenSxc.recreate();
//  }

//  function getContext(): ContextOfButton {
//    return context(getTag(reSxc()));
//  }

//  newFrm.scrollToTarget = () => {
//    $('body').animate({
//        scrollTop: newFrm.tagModule.offset().top - scrollTopOffset
//      } as any,
//      animationTime);
//  };


//  newFrm.rewire = (sxc: SxcInstanceWithInternals, callback: () => void, dialogName: string) => {
//    newFrm.hiddenSxc = sxc;
//    newFrm.tagModule = $($(getTag(sxc)).parent().eq(0));
//    newFrm.sxcCacheKey = sxc.cacheKey;
//    newFrm.closeCallback = callback;
//    if (dialogName) {
//      newFrm.dialogName = dialogName;
//    }
//  };

//  newFrm.cancel = () => {
//    newFrm.toggle(false);
//    // todo: only re-init if something was changed?
//    // return cbApi.reloadAndReInitialize(reSxc());
//    // cancel the dialog
//    QuickEditState.cancelled.set('true');
//    //localStorage.setItem('cancelled-dialog', 'true');
//    newFrm.closeCallback();
//  };

//  return newFrm;
//}