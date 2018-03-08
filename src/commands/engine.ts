import { ContextOfButton } from '../context/context-of-button';
import { Commands } from '../toolbar2/command/commands';
import { commandCreate } from './command-create';
import { commandExecuteAction } from './command-execute-action';
import { Settings } from './settings';

export class Engine {
  commands = Commands.getInstance;

  // assemble an object which will store the configuration and execute it
  create = (context: ContextOfButton, specialSettings: Settings) => {
    return commandCreate(context, specialSettings);
  };

  run2 = (context: ContextOfButton, nameOrSettings: any, eventOrSettings?: any, event?: any) => {
    // console.log('stv: context', context);
    return commandExecuteAction(context, nameOrSettings, eventOrSettings, event);
  };

}

export function instanceEngine(): Engine {
  return new Engine();
}
