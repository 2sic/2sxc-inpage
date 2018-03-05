import { CommandBase } from '../command-base';

export class InstanceList extends CommandBase {
  constructor() {
    super();
    this.makeDef('instance-list', 'Sort', 'list-numbered', false, true, {
      showCondition(context, settings, modConfig) {
        return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
      },
    })
  }
}
