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
  icon?(context: ContextOfButton): string;
  params?(context: ContextOfButton): Params;
  partOfPage?(context: ContextOfButton): boolean;
  showCondition?(context: ContextOfButton): boolean;
  title?(context: ContextOfButton): string;
  uiActionOnly?(context: ContextOfButton): boolean;
  
  // todo STV try to refactor so it is also (context)
  newWindow?: boolean;

  // todo STV try to refactor so it is also (context)
  inlineWindow?: boolean;

  // todo STV try to refactor so it is also (context)
  fullScreen?: boolean;
}
