export class Def {
  name?: string;
  title?: string;
  icon?: string;
  uiActionOnly?: boolean;
  partOfPage?: boolean;
  params?: any;
  dialog?: string;
  showCondition?(settings: any, modConfig: any): boolean;
  code?(settings: any, event: any, sxc: SxcInstanceWithInternals): any;
  dynamicClasses?(settings: any): any;
  disabled?(settings: any, modConfig: any): boolean;
  configureCommand?(cmd: any): void;
  newWindow?: boolean;
  inlineWindow?: boolean;
  fullScreen?: boolean;
}