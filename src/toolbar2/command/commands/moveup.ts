import { changeOrder } from '../../../contentBlock/actions';
import { CommandBase } from '../command-base';

export class MoveUp extends CommandBase {
  constructor() {
    super();
    this.makeDef('moveup',
      'MoveUp',
      'move-up',
      false,
      true,
      {
        showCondition(context, settings, modConfig) {
          return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
        },
        code(context, settings, event, sxc) {
          changeOrder(sxc, settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
        },
      });
  }
}
