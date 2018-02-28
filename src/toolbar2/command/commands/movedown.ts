import { changeOrder } from '../../../contentBlock/actions';
import { CommandBase } from '../command-base';

export class MoveDown extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('movedown',
      'MoveDown',
      'move-down',
      false,
      true,
      {
        showCondition(settings, modConfig) {
          // TODO: do not display if is last item in list
          return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code(settings, event, sxc) {
          // TODO: make sure index is never greater than the amount of items
          changeOrder(sxc, settings.sortOrder, settings.sortOrder + 1);
        },
      });
  }
}
