import { publish, publishId } from '../../contentBlock/actions';
import { translate } from '../../translate/2sxc.translate';
import { CommandBase } from '../command-base';

/**
 * todo: shouldn't be available if changes are not allowed
 *
 * import this module to commands.ts
 */
export class Publish extends CommandBase {
  constructor() {
    super();
    this.makeDef('publish',
      'Unpublished',
      'eye-off',
      false,
      false,
      {
        showCondition(context) {
          return (context.button.action.params.isPublished === false);
        },
        disabled: (context, settings) => {
          return !context.instance.allowPublish;
        },
        code: (context, settings) => {
          if (context.button.action.params.isPublished) {
            return alert(translate('Toolbar.AlreadyPublished'));
          }

          // if we have an entity-id, publish based on that
          if (context.button.action.params.entityId) {
            return publishId(context.sxc.sxc, context.button.action.params.entityId);
          }

          const part: string = context.button.action.params.sortOrder === -1 ? 'listcontent' : 'content';
          const index = context.button.action.params.sortOrder === -1 ? 0 : context.button.action.params.sortOrder;
          return publish(context.sxc.sxc, part, index);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Publish();
