
/**
 * initialise _commands
 */
interface ICommands {
  definitions?: IDefinitions;
  instanceEngine?(sxc: SxcInstanceWithInternals, editContext: any): IEngine;
}

$2sxc._commands = {};
