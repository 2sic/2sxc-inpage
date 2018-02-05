import { Settings } from './settings';
import { ModConfig } from './mod-config';

export class Def {
  name?: string;
  title?: string;
  icon?: string;
  uiActionOnly?: boolean;
  partOfPage?: boolean;
  params?: any;
  dialog?: string;
  showCondition?(settings: Settings, modConfig: ModConfig): boolean | number | string;
  code?(settings: Settings, event: ModConfig, sxc: SxcInstanceWithInternals): void;
  dynamicClasses?(settings: Settings): string;
  disabled?(settings: Settings, modConfig: any): boolean;
  configureCommand?(cmd: any): void;
  newWindow?: boolean;
  inlineWindow?: boolean;
  fullScreen?: boolean;
}