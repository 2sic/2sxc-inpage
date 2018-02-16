import { ButtonConfig } from '../toolbar2/button/config';
import { Command } from './command';
import { ModConfig } from './mod-config';
import { Params } from './params';
import { Settings } from './settings';

export class Definition {
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
  configureCommand?(cmd: Command): void;
  newWindow?: boolean;
  inlineWindow?: boolean;
  fullScreen?: boolean;

  tmpButtonDefaults?: Partial<ButtonConfig>;
}
