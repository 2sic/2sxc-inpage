
/**
 * initialise _commands
 */
interface ICommands {
  definitions?: IDefinitions;
  instanceEngine?(sxc: SxcInstanceWithInternals, editContext: any): any;
}

$2sxc._commands = {};
