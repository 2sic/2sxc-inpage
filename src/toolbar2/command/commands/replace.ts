import { CommandBase } from '../command-base';

export class Replace extends CommandBase {
  constructor() {
    super();
    this.makeDef('replace', 'Replace', 'replace', false, true, {
      showCondition(context, settings) {
        return settings.useModuleList;
      },
    });
  }
}
