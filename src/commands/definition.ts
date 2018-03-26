import { ContextOfButton } from '../context/context-of-button';
import { Command } from './command';
import { Params } from './params';
import { Settings } from './settings';

// todo: pls ensure these properties all have a typedoc
// as it will be in the public API
export class Definition {
  name?: string;
  code?(context: ContextOfButton): void;
  configureCommand?(context: ContextOfButton, cmd: Command): void;
  dialog?(context: ContextOfButton): string;
  disabled?(context: ContextOfButton): boolean;
  dynamicClasses?(context: ContextOfButton): string;
  fullScreen?(context: ContextOfButton): boolean;
  icon?(context: ContextOfButton): string;
  inlineWindow?(context: ContextOfButton): boolean;
  newWindow?(context: ContextOfButton): boolean;
  params?(context: ContextOfButton): Params;
  partOfPage?(context: ContextOfButton): boolean;
  showCondition?(context: ContextOfButton): boolean;
  title?(context: ContextOfButton): string;
  uiActionOnly?(context: ContextOfButton): boolean;
}
