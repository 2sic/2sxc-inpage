﻿import { removeFromList } from '../../../contentBlock/actions';
import { translate } from '../../../translate/2sxc.translate';
import { CommandBase } from '../command-base';

/**
 * remove an item from the placeholder (usually for lists)
 */
export class Remove extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('remove',
      'Remove',
      'minus-circled',
      false,
      true,
      {
        showCondition(settings, modConfig) {
          return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code(settings, event, sxc) {
          if (confirm(translate('Toolbar.ConfirmRemove'))) {
            removeFromList(sxc, settings.sortOrder);
            // sxc.manage.contentBlock
            //    .removeFromList(settings.sortOrder);
          }
        },
      });
  }
}