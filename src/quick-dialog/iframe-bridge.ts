import { _contentBlock } from '../contentBlock/main-content-block';
import { ajaxLoad, reloadAndReInitialize, showMessage } from '../contentBlock/render';
import { updateTemplateFromDia } from '../contentBlock/templates';
import { context } from '../context/context';
import { getTag } from '../manage/api';
import { ContextOfButton } from '../context/context-of-button';
import { QuickDialogConfig } from '../manage/quick-dialog-config';
import { NgDialogParams } from '../manage/ng-dialog-params';
import DialogFrameElement = require('./iDialogFrameElement');
import IDialogFrameElement = DialogFrameElement.IDialogFrameElement;
import { quickDialogInternals } from './quick-dialog';
import IDialogWithIFrameDefinition = DialogFrameElement.IDialogWithIFrameDefinition;
import QuickEditState = require('./quick-edit-state');

const scrollTopOffset: number = 80;

/**
 * extend IFrame with Sxc state
 * @param iFrame
 */
export function connectIframeToSxcInstance(iFrame: any): IDialogWithIFrameDefinition {
  let hiddenSxc: SxcInstanceWithInternals = null;
  // ReSharper disable once UnusedLocals
  const cbApi = _contentBlock;
  let tagModule: any = null;

  /**
   * get the sxc-object of this iframe
   * @returns {Object<any>} refreshed sxc-object
   */
  function reSxc(): SxcInstanceWithInternals {
    if (!hiddenSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
    return hiddenSxc.recreate();
  }

  function getContext(): ContextOfButton {
    return context(getTag(reSxc()));
  }

  const frameElement: IDialogFrameElement = {
    getAdditionalDashboardConfig: () => QuickDialogConfig.fromContext(reSxc().manage.context),// ._quickDialogConfig,
    scrollToTarget: () => {
      $('body').animate({
        scrollTop: tagModule.offset().top - scrollTopOffset,
      });
    },
    persistDia: () => QuickEditState.cbId.set(getContext().contentBlock.id.toString()),// persistDialog(getContext()),
    toggle: (show: boolean) => quickDialogInternals.toggle(show),
    run: (verb: string) => reSxc().manage.run(verb),
    getManageInfo: () => NgDialogParams.fromContext(reSxc().manage.context),// ._dialogParameters,
    showMessage: (message: string) => showMessage(getContext(), `<p class="no-live-preview-available">${message}</p>`),
    reloadAndReInit: () => reloadAndReInitialize(getContext(), true, true),
    saveTemplate: (templateId: number) => updateTemplateFromDia(getContext(), templateId, false),
    previewTemplate: (templateId: number) => ajaxLoad(getContext(), templateId, true),
    cancel: null
  };

  const newFrm = Object.assign(
    iFrame,
    frameElement,
    {
      closeCallback: null,
    }
  ) as IDialogWithIFrameDefinition;

  newFrm.rewire = (sxc: SxcInstanceWithInternals, callback: () => void, dialogName: string) => {
    hiddenSxc = sxc;
    tagModule = $($(getTag(sxc)).parent().eq(0));
    newFrm.sxcCacheKey = sxc.cacheKey;
    newFrm.closeCallback = callback;
    if (dialogName) {
      newFrm.dialogName = dialogName;
    }
  };

  newFrm.cancel = () => {
    newFrm.toggle(false);
    // todo: only re-init if something was changed?
    // return cbApi.reloadAndReInitialize(reSxc());
    // cancel the dialog
    QuickEditState.cancelled.set('true');
    //localStorage.setItem('cancelled-dialog', 'true');
    newFrm.closeCallback();
  };

  return newFrm;
}