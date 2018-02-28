import { CommandBase } from '../command-base';

export class InstanceList extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('instance-list', 'Sort', 'list-numbered', false, true, {
      showCondition(settings, modConfig) {
        return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
      },
    })
  }
}
