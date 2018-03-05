import { removeFromList } from '../../../contentBlock/actions';
import { translate } from '../../../translate/2sxc.translate';
import { CommandBase } from '../command-base';

/**
 * remove an item from the placeholder (usually for lists)
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
        showCondition(context, settings, modConfig) {
          return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code(context, settings, event, sxc) {
          if (confirm(translate('Toolbar.ConfirmRemove'))) {
            removeFromList(sxc, settings.sortOrder);
            // sxc.manage.contentBlock
            //    .removeFromList(settings.sortOrder);
          }
        },
      });
  }
}
