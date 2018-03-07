import { publish, publishId } from '../../../contentBlock/actions';
import { translate } from '../../../translate/2sxc.translate';
import { CommandBase } from '../command-base';

/**
 * todo: shouldn't be available if changes are not allowed
 */
export class Publish extends CommandBase {
  constructor() {
    super();
    this.makeDef('publish', 'Unpublished', 'eye-off', false, false, {
      showCondition(context, settings) {
        return settings.isPublished === false;
      },
      disabled(context, settings) {
        return !context.instance.allowPublish;
      },
      code(context, settings) {
        if (settings.isPublished) return alert(translate('Toolbar.AlreadyPublished'));

        // if we have an entity-id, publish based on that
        if (settings.entityId) return publishId(context.sxc.sxc, settings.entityId);

        const part: string = settings.sortOrder === -1 ? 'listcontent' : 'content';
        const index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
        return publish(context.sxc.sxc, part, index);
      },
    });
  }
}
