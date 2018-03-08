import { ContextOfButton } from '../context/context-of-button';
import { Command } from './command';
import { Params } from './params';
import { Settings } from './settings';

export class Definition {
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
