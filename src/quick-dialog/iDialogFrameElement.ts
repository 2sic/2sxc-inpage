import { QuickDialogConfig } from '../manage/quick-dialog-config';

/**
 * copy interface from C:\Projects\2sxc-ui\angular\quick-dialog\src\app\core\dialog-frame-element.ts
 */
export interface IDialogFrameElement /*extends HTMLIFrameElement*/ {
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
}
