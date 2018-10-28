﻿import { ajaxLoad, reloadAndReInitialize, showMessage } from '../contentBlock/render';
import { updateTemplateFromDia } from '../contentBlock/templates';
import { context } from '../context/context';
import { getTag } from '../manage/api';
import { ContextOfButton } from '../context/context-of-button';
import { quickDialogInternals } from './quick-dialog';
import QuickEditState = require('./state');
import { IDialogFrameElement } from './iDialogFrameElement';
import { IIFrameExtensions } from './iiframe-extensions';
import { QuickDialogConfig } from './quick-dialog-config';
import { IQuickDialogConfig } from '../interfaces/iquick-dialog-config';

const scrollTopOffset: number = 80;
const animationTime: number = 400;

export function build(iFrame: HTMLIFrameElement): IDialogFrameElement {
  console.log('prot: ', DialogIFrame.prototype);
  const iFrameExtended = iFrame as IDialogFrameElement;
  iFrameExtended.bridge = new DialogIFrame();
  console.log('extensions: ', iFrameExtended.bridge);
  return iFrameExtended;
}

/**
 * 
 */
export class DialogIFrame implements IIFrameExtensions {

  sxcCacheKey: string;
  dialogName: string;

  /** internal object to keep track of the sxc-instance */
  hiddenSxc: SxcInstanceWithInternals;

  /** The html-tag of the current module */
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

  hide(): void {
    quickDialogInternals.toggle(false);
  }

  toggle(show: boolean) {
    quickDialogInternals.toggle(show);
  }

  run(verb: string) {
    this.reSxc().manage.run(verb);
  }

  showMessage(message: string) {
    showMessage(this.getContext(), `<p class="no-live-preview-available">${message}</p>`);
    scrollToTarget(this.tagModule);
  }

  reloadAndReInit(): Promise<IQuickDialogConfig> {
    return reloadAndReInitialize(this.getContext(), true, true)
      .then(() => scrollToTarget(this.tagModule))
      .then(() => Promise.resolve(this.getAdditionalDashboardConfig()));
  }

  setTemplate(templateId: number, templateName: string, final: boolean): Promise<any> {
    const config = this.getAdditionalDashboardConfig();
    const ajax = config.isContent || config.supportsAjax;
    this.showMessage(`refreshing <b>${templateName}</b>...`);
    const promise = ajax 
      ? ajaxLoad(this.getContext(), templateId, !final)
        .then(() => scrollToTarget(this.tagModule))
      : updateTemplateFromDia(this.getContext(), templateId, false)
        .then(() => window.parent.location.reload());
    return promise.then(result => {
      if (final) this.hide();
      return result;
    });
  }

  //private saveTemplate(templateId: number) {
  //  return updateTemplateFromDia(this.getContext(), templateId, false);
  //}

  //private previewTemplate(templateId: number, justPreview: boolean) {
  //  return ajaxLoad(this.getContext(), templateId, justPreview)
  //    .then(() => scrollToTarget(this.tagModule));
  //}

  closeCallback() {};





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
    this.hide();
    // todo: only re-init if something was changed?
    // return cbApi.reloadAndReInitialize(reSxc());
    // cancel the dialog
    QuickEditState.cancelled.set('true');
    this.closeCallback();
  };
}

function scrollToTarget(target: JQuery<HTMLElement>) {
  const specs = {
    scrollTop: target.offset().top - scrollTopOffset
  } as any;
  $('body').animate(specs, animationTime);
};

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