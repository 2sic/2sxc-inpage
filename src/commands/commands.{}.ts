import { create } from './commands.definitions';
import { instanceEngine } from './commands.engine';
import { initializeInstanceCommands } from './commands.instanceCommands';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

//TEST
twoSxc._commands = {
  definitions: {
    create,
  },
  instanceEngine,
  initializeInstanceCommands
};