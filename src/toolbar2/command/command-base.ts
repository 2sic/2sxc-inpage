import { Definition } from '../../commands/definition';
import { getButtonConfigDefaultsV1 } from '../button/expand-button-config';
import { CommandDefinition } from './command-definition';
import { CmdSpec } from '../../commands/cmd-spec';

export abstract class CommandBase {

  public commandDefinition = new CommandDefinition();

  protected enableTools: boolean;
  protected isContent: boolean;

  constructor(cmdSpecs: CmdSpec) {
    this.enableTools = cmdSpecs.canDesign;
    this.isContent = cmdSpecs.isContent;
  }

  // quick helper so we can better debug the creation of definitions
  protected makeDef(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Definition): void {
    if (typeof (partOfPage) !== 'boolean') {
      throw 'partOfPage in commands not provided, order will be wrong!';
    }

    // Toolbar API v2
    this.commandDefinition.name = name;
    this.commandDefinition.buttonConfig = getButtonConfigDefaultsV1(name, icon, translateKey, uiOnly, partOfPage, more);
  }
}
