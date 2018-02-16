import { create } from './action-create';
import { commandInitializeInstanceCommands } from './command-initialize-instance-commands';
import { instanceEngine } from './engine';

class Commands {
  definitions = {
    create,
  };
  instanceEngine = instanceEngine;
  initializeInstanceCommands = commandInitializeInstanceCommands;
}


export const _commands = new Commands();
