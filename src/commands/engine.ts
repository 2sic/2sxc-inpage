import { context } from '../context/context';
import { ContextOfButton } from '../context/context-of-button';
import { getTag } from '../manage/api';
import { commandCreate } from './command-create';
import { commandExecuteAction } from './command-execute-action';
import { Commands } from './commands';
import { Settings } from './settings';

export class Engine {
  commands = Commands.getInstance;
  context: ContextOfButton;

  constructor(private sxc: SxcInstanceWithInternals) {  }

  // assemble an object which will store the configuration and execute it
  create = (context: ContextOfButton, specialSettings: Settings) => {
    return commandCreate(context);
  }

  run = (nameOrSettings: any, eventOrSettings?: any, event?: any) => {
    const tag = getTag(this.sxc);
    this.context = context(tag);
    return commandExecuteAction(this.context, nameOrSettings, eventOrSettings, event);
  }

  run2 = (contextOfButton: ContextOfButton, nameOrSettings: any, eventOrSettings?: any, event?: any) => {
    return commandExecuteAction(contextOfButton, nameOrSettings, eventOrSettings, event);
  }

}

export function instanceEngine(sxc: SxcInstanceWithInternals): Engine {
  return new Engine(sxc);
}
