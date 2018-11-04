import { renderer } from '../contentBlock/render';
import { updateTemplateFromDia } from '../contentBlock/templates';
import { context } from '../context/context';
import { getTag } from '../manage/api';
import { ContextOfButton } from '../context/context-of-button';
import { quickDialog } from './quick-dialog';
import { IDialogFrameElement } from './iDialogFrameElement';
import { QuickDialogConfig } from './quick-dialog-config';
import { IQuickDialogConfig } from '../interfaces/iquick-dialog-config';

const scrollTopOffset: number = 80;
const animationTime: number = 400;

export function build(iFrame: HTMLIFrameElement): IDialogFrameElement {
  console.log('prot: ', IFrameBridge.prototype);
  const iFrameExtended = iFrame as IDialogFrameElement;
  iFrameExtended.bridge = new IFrameBridge();
  console.log('extensions: ', iFrameExtended.bridge);
  return iFrameExtended;
}

/**
 * 
 */
// ReSharper disable once InconsistentNaming
export class IFrameBridge {

  sxcCacheKey: string;
  dialogName: string;

  /** internal object to keep track of the sxc-instance */
  instanceSxc: SxcInstanceWithInternals;

  /** The html-tag of the current module */
  tagModule: JQuery<HTMLElement>;

  /**
   * get the sxc-object of this iframe
   * @returns {Object<any>} refreshed sxc-object
   */
  uncachedSxc(): SxcInstanceWithInternals {
    if (!this.instanceSxc) throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
    return this.instanceSxc.recreate();
  }

  getContext(): ContextOfButton { return context(this.uncachedSxc()); }


  getAdditionalDashboardConfig() { return QuickDialogConfig.fromContext(this.getContext()); }

  hide(): void { quickDialog.setVisible(false); }

  run(verb: string) { this.uncachedSxc().manage.run(verb); }

  showMessage(message: string) {
    renderer.showMessage(this.getContext(), `<p class="no-live-preview-available">${message}</p>`);
    scrollToTarget(this.tagModule);
  }

  reloadAndReInit(): Promise<IQuickDialogConfig> {
    this.changed = false;
    return renderer.reloadAndReInitialize(this.getContext(), true, true)
      .then(() => scrollToTarget(this.tagModule))
      .then(() => Promise.resolve(this.getAdditionalDashboardConfig()));
  }

  setTemplate(templateId: number, templateName: string, final: boolean): Promise<any> {
    this.changed = true;
    const config = this.getAdditionalDashboardConfig(),
      context = this.getContext();
    const ajax = config.isContent || config.supportsAjax;
    this.showMessage(`refreshing <b>${templateName}</b>...`);

    const promise = ajax
      ? (final
        ? updateTemplateFromDia(context, templateId /*, false*/)
        : renderer.ajaxLoad(context, templateId, true))
      .then(() => scrollToTarget(this.tagModule))
      : updateTemplateFromDia(context, templateId /*, false*/)
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

  //cancelCallback() {};

  changed = false;
  //promise: Promise<boolean>;
  //resolvePromise: (value?: boolean) => void;





  setup(sxc: SxcInstanceWithInternals, dialogName: string): void /*Promise<boolean>*/ {
    console.log('rewire with sxc: ', sxc);

    //this.promise = new Promise<boolean>(resolve => this.resolvePromise = resolve);
    this.changed = false;

    this.instanceSxc = sxc;
    this.tagModule = $($(getTag(sxc)).parent().eq(0));
    this.sxcCacheKey = sxc.cacheKey;
    if (dialogName)
      this.dialogName = dialogName;
    //return this.promise;
  };

  cancel(): void {
    quickDialog.cancel(this);
    //this.hide();
    //QuickEditState.cancelled.set('true');
    //this.resolvePromise(this.changed);
  };
}

function scrollToTarget(target: JQuery<HTMLElement>) {
  const specs = {
    scrollTop: target.offset().top - scrollTopOffset
  } as any;
  $('body').animate(specs, animationTime);
};
