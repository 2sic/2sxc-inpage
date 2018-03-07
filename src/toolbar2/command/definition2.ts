import { Command } from '../../commands/command';
import { ContextOfButton } from '../../context/context-of-button';
import { Settings } from '../../commands/settings';

export class Definition2 {
  name?: string;
  title?(context: ContextOfButton): string;
  icon?: string;
  uiActionOnly?: boolean;
  partOfPage?: boolean;
  params?(context: ContextOfButton): any ; // stv: Params;
  dialog?: string;
  showCondition?(context: ContextOfButton, settings: Settings): boolean | number | string;
  code?(context: ContextOfButton, settings: Settings, sxc: SxcInstanceWithInternals): void;
  dynamicClasses?(context: ContextOfButton, settings: Settings): string;
  disabled?(context: ContextOfButton, settings: Settings): boolean;
  configureCommand?(context: ContextOfButton, cmd: Command): void;
  newWindow?: boolean;
  inlineWindow?: boolean;
  fullScreen?: boolean;
}
