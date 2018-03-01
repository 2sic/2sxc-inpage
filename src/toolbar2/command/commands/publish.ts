﻿import { publish, publishId } from '../../../contentBlock/actions';
import { translate } from '../../../translate/2sxc.translate';
import { CommandBase } from '../command-base';

/**
 * todo: shouldn't be available if changes are not allowed
 */
export class Publish extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('publish', 'Unpublished', 'eye-off', false, false, {
      showCondition(settings, modConfig) {
        return settings.isPublished === false;
      },
      disabled(settings, modConfig) {
        return !cmdSpecs.allowPublish;
      },
      code(settings, event, sxc) {
        if (settings.isPublished) return alert(translate('Toolbar.AlreadyPublished'));

        // if we have an entity-id, publish based on that
        if (settings.entityId) return publishId(sxc, settings.entityId);

        const part: string = settings.sortOrder === -1 ? 'listcontent' : 'content';
        const index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
        return publish(sxc, part, index);
      },
    });
  }
}