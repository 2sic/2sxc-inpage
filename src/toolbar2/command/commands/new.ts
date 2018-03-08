import { commandOpenNgDialog } from '../../../commands/command-open-ng-dialog';
import { Settings } from '../../../commands/settings';
import { CommandBase } from '../command-base';

/**
 * new is a dialog to add something, and will not add if cancelled
 * new can also be used for mini-toolbars which just add an entity not attached to a module
 * in that case it's essential to add a contentType like
 * <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
 *
 * import this module to commands.ts
 */
export class New extends CommandBase {
  constructor() {
    super();
    this.makeDef('new', 'New', 'plus', false, true, {
      params: (context) => {
        return { mode: 'new' };
      },
      dialog: 'edit', // don't use "new" (default) but use "edit"
      showCondition(context, settings) {
        return settings.contentType || context.contentBlock.isList && settings.useModuleList && settings.sortOrder !== -1; // don't provide new on the header-item
      },
      code(context, settings) {
        // todo - should refactor this to be a toolbarManager.contentBlock command
        const settingsExtend = Object.assign(settings, { sortOrder: settings.sortOrder + 1 }) as Settings;
        commandOpenNgDialog(context, settingsExtend);
      },
    });
  }
}

const cmd = new New();
