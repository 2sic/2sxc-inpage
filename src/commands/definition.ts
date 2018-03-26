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

  // todo STV try to refactor so it is also (context)
    icon?: string;

  // todo STV try to refactor so it is also (context)
    uiActionOnly?: boolean;

  // todo STV try to refactor so it is also (context)
    partOfPage?: boolean;

  params?(context: ContextOfButton): Params;

  // todo STV try to refactor so it is also (context)
    dialog?: string;

  // todo STV try to refactor so it doesn't need settings
  showCondition?(context: ContextOfButton): boolean;

  // todo STV try to refactor so it doesn't need settings
    code?(context: ContextOfButton, settings: Settings): void;

  // todo STV try to refactor so it doesn't need settings
    dynamicClasses?(context: ContextOfButton, settings: Settings): string;

  // todo STV try to refactor so it doesn't need settings
    disabled?(context: ContextOfButton, settings: Settings): boolean;

  // todo STV try to refactor so it doesn't need settings
    configureCommand?(context: ContextOfButton, cmd: Command): void;

  // todo STV try to refactor so it is also (context)
  newWindow?: boolean;

  // todo STV try to refactor so it is also (context)
  inlineWindow?: boolean;

  // todo STV try to refactor so it is also (context)
  fullScreen?: boolean;
}
