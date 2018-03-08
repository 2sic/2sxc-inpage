import { changeOrder } from '../../../contentBlock/actions';
import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class MoveUp extends CommandBase {
  constructor() {
    super();
    this.makeDef('moveup',
      'MoveUp',
      'move-up',
      false,
      true,
      {
        showCondition(context, settings) {
          return context.contentBlock.isList &&
            settings.useModuleList &&
            settings.sortOrder !== -1 &&
            settings.sortOrder !== 0;
        },
        code(context, settings) {
          changeOrder(context.sxc.sxc, settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
        },
      });
  }
}

const cmd = new MoveUp();
