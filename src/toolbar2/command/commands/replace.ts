import { CommandBase } from '../command-base';

export class Replace extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('replace', 'Replace', 'replace', false, true, {
      showCondition(settings, modConfig) {
        return settings.useModuleList;
      },
    });
  }
}
