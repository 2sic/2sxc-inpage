import { CommandDefinition } from '../command/command-definition';

export class ButtonAction {
  // name: string; // the command name from the action list
  // params: any[]; // custom parameters if used or if these override other params
  commandDefinition: CommandDefinition; // reference to action to be run
  code: string; // custom code if used

  constructor(public name: string, public params?: any[]) { }
}
