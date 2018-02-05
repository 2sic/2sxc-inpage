import { Settings } from './settings';
import { ModConfig } from './mod-config';
import { Params } from './params';
import { Cmd } from './cmd';

export class Def {
  name?: string;
  title?: string;
  icon?: string;
  uiActionOnly?: boolean;
  partOfPage?: boolean;
  params?: Params;
  dialog?: string;
  showCondition?(settings: Settings, modConfig: ModConfig): boolean | number | string;
  code?(settings: Settings, event: ModConfig, sxc: SxcInstanceWithInternals): void;
  dynamicClasses?(settings: Settings): string;
  disabled?(settings: Settings, modConfig: ModConfig): boolean;
  configureCommand?(cmd: Cmd): void;
  newWindow?: boolean;
  inlineWindow?: boolean;
  fullScreen?: boolean;
}