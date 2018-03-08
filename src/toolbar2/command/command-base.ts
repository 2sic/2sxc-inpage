import { getButtonConfigDefaultsV1 } from '../button/expand-button-config';
import { CommandDefinition } from './command-definition';
import { Commands } from './commands';
import { Definition2 } from './definition2';

export abstract class CommandBase {

  commandDefinition = new CommandDefinition();

  // quick helper so we can better debug the creation of definitions
  protected makeDef(name: string,
    translateKey: string,
    icon: string,
    uiOnly: boolean,
    partOfPage: boolean,
    more: Definition2): void {
    if (typeof (partOfPage) !== 'boolean') {
      throw 'partOfPage in commands not provided, order will be wrong!';
    }

    // Toolbar API v2
    this.commandDefinition.name = name;
    this.commandDefinition.buttonConfig = getButtonConfigDefaultsV1(name, icon, translateKey, uiOnly, partOfPage, more);

    // register new CommandDefinition with in Commands
    Commands.getInstance().addDef(this.commandDefinition);
  }
}
