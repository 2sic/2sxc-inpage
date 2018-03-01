﻿import { contentItems } from '../../../entity-manipulation/item-commands';
import { CommandBase } from '../command-base';

/**
 * todo: work in progress related to https://github.com/2sic/2sxc/issues/618
 */
export class Delete extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('delete', 'Delete', 'cancel', true, false, {
      // disabled: true,
      showCondition(settings, modConfig) {
        // can never be used for a modulelist item, as it is always in use somewhere
        if (settings.useModuleList)
          return false;

        // check if all data exists required for deleting
        return settings.entityId && settings.entityGuid && settings.entityTitle;
      },
      code(settings, event, sxc) {
        contentItems.delete(sxc, settings.entityId, settings.entityGuid, settings.entityTitle);
      },
    });
  }
}