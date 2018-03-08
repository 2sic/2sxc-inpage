import { Command } from '../../commands/command';
import { Params } from '../../commands/params';
import { Settings } from '../../commands/settings';
import { ContextOfButton } from '../../context/context-of-button';

export class Definition2 {
  name?: string;

  title?(context: ContextOfButton): string;

  icon?: string;
  uiActionOnly?: boolean;
  partOfPage?: boolean;

  params?(context: ContextOfButton): Params;

  dialog?: string;

  showCondition?(context: ContextOfButton, settings: Settings): boolean | number | string;

  code?(context: ContextOfButton, settings: Settings): void;

  dynamicClasses?(context: ContextOfButton, settings: Settings): string;

  disabled?(context: ContextOfButton, settings: Settings): boolean;

  configureCommand?(context: ContextOfButton, cmd: Command): void;

  newWindow?: boolean;
  inlineWindow?: boolean;
  fullScreen?: boolean;
}
