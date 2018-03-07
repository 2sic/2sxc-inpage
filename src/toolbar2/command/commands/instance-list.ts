import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class InstanceList extends CommandBase {
  constructor() {
    super();
    this.makeDef('instance-list', 'Sort', 'list-numbered', false, true, {
      showCondition(context, settings) {
        return context.contentBlock.isList && settings.useModuleList && settings.sortOrder !== -1;
      },
    });
  }
}

const cmd = new InstanceList();
