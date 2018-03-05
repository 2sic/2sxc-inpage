import {Settings} from '../../../commands/settings';
import { CommandBase } from '../command-base';

/**
 * create a metadata toolbar
 */
export class Metadata extends CommandBase {
  constructor() {
    super();
    this.makeDef('metadata', 'Metadata', 'tag', false, false, {
      params: (context) => {
        return { mode: 'new' };
      },
      dialog: 'edit', // don't use "new" (default) but use "edit"
      dynamicClasses(context, settings): string {
        // if it doesn't have data yet, make it less strong
        return settings.entityId ? '' : 'empty';
        // return settings.items && settings.items[0].entityId ? "" : "empty";
      },
      showCondition(context, settings, modConfig) {
        return !!settings.metadata;
      }, // only add a metadata-button if it has metadata-infos
      configureCommand(context, cmd) {
        const itm = {
          Title: 'EditFormTitle.Metadata',
          Metadata: Object.assign({ keyType: 'string', targetType: 10 }, cmd.settings.metadata),
        };
        Object.assign(cmd.items[0], itm);
      },
    });
  }
}
