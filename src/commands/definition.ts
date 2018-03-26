import { ContextOfButton } from '../context/context-of-button';
import { Command } from './command';
import { Params } from './params';
import { Settings } from './settings';

// todo: pls ensure these properties all have a typedoc
// as it will be in the public API
export class Definition {
  /**
    * 
    */
  name?: string;

  title?(context: ContextOfButton): string;

  icon?(context: ContextOfButton): string;

  // todo STV try to refactor so it is also (context)
    uiActionOnly?: boolean;

  // todo STV try to refactor so it is also (context)
    partOfPage?: boolean;

  params?(context: ContextOfButton): Params;

  // todo STV try to refactor so it is also (context)
    dialog?: string;

  showCondition?(context: ContextOfButton): boolean;

  code?(context: ContextOfButton): void;

  dynamicClasses?(context: ContextOfButton): string;

  disabled?(context: ContextOfButton): boolean;

  configureCommand?(context: ContextOfButton, cmd: Command): void;

  // todo STV try to refactor so it is also (context)
  newWindow?: boolean;

  // todo STV try to refactor so it is also (context)
  inlineWindow?: boolean;

  // todo STV try to refactor so it is also (context)
  fullScreen?: boolean;
}
