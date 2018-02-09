import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { commandInitializeInstanceCommands } from './command-initialize-instance-commands';
import { create } from './create';
import { instanceEngine } from './engine';

class Commands {
  definitions = {
    create,
  };
  instanceEngine = instanceEngine;
  initializeInstanceCommands = commandInitializeInstanceCommands;
}

twoSxc._commands = new Commands();
