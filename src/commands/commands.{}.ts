import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { create } from './commands.definitions';
import { instanceEngine } from './engine';
import { commandInitializeInstanceCommands } from './command-initialize-instance-commands';

//TEST
twoSxc._commands = {
  definitions: {
    create,
  },
  instanceEngine,
  commandInitializeInstanceCommands
};