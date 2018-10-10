import { QuickDialogConfig } from '../manage/quick-dialog-config';

/**
 * copy interface from C:\Projects\2sxc-ui\angular\quick-dialog\src\app\core\dialog-frame-element.ts
 */


interface IIFrameExtensionShared {
  getAdditionalDashboardConfig(): QuickDialogConfig; // HACK: it was `any` in original
  // isDirty(): boolean; // HACK: we do not have it here
  scrollToTarget(): void;
  persistDia(): void;
  //sxc: any;
  toggle(action: boolean): void;
  run(verb: string): void;
  getManageInfo(): any;
  showMessage(message: string): void;
  reloadAndReInit(): Promise<any>;
  saveTemplate(templateId: number): Promise<any>;
  previewTemplate(templateId: number): Promise<any>;

  /**
   * the cancel callback to close this dialog cancelling changes
   */
  cancel(): void;
}

export interface IIFrameExtensions extends IIFrameExtensionShared {

  // stuff we need here, not in the angular project
  closeCallback(): void,
  rewire(sxc: SxcInstanceWithInternals, callback: any, dialogName: string): void,

}

export interface IDialogFrameElement extends HTMLIFrameElement, IIFrameExtensions {

}
