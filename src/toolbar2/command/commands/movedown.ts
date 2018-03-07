﻿import { changeOrder } from '../../../contentBlock/actions';
import { CommandBase } from '../command-base';

export class MoveDown extends CommandBase {
  constructor() {
    super();
    this.makeDef('movedown',
      'MoveDown',
      'move-down',
      false,
      true,
      {
        showCondition(context, settings) {
          // TODO: do not display if is last item in list
          return context.contentBlock.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code(context, settings, sxc) {
          // TODO: make sure index is never greater than the amount of items
          changeOrder(sxc, settings.sortOrder, settings.sortOrder + 1);
        },
      });
  }
}
