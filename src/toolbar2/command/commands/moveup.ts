import { changeOrder } from '../../../contentBlock/actions';
import { CommandBase } from '../command-base';

export class MoveUp extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('moveup',
      'MoveUp',
      'move-up',
      false,
      true,
      {
        showCondition(settings, modConfig) {
          return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
        },
        code(settings, event, sxc) {
          changeOrder(sxc, settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
        },
      });
  }
}
