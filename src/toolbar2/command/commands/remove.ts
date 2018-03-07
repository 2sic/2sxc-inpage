import { removeFromList } from '../../../contentBlock/actions';
import { translate } from '../../../translate/2sxc.translate';
import { CommandBase } from '../command-base';

/**
 * remove an item from the placeholder (usually for lists)
 *
 * import this module to commands.ts
 */
export class Remove extends CommandBase {
  constructor() {
    super();
    this.makeDef('remove',
      'Remove',
      'minus-circled',
      false,
      true,
      {
        showCondition(context, settings) {
          return context.contentBlock.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code(context, settings) {
          if (confirm(translate('Toolbar.ConfirmRemove'))) {
            removeFromList(context.sxc.sxc, settings.sortOrder);
            // sxc.manage.contentBlock
            //    .removeFromList(settings.sortOrder);
          }
        },
      });
  }
}

const cmd = new Remove();
