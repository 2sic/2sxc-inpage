import { create } from './commands.definitions';
import { instanceEngine } from './commands.engine';
import { initializeInstanceCommands } from './commands.instanceCommands';

$2sxc._commands = {
  definitions: {
    create: create,
  },
  instanceEngine: instanceEngine,
  initializeInstanceCommands: initializeInstanceCommands
};