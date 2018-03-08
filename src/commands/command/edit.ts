import { CommandBase } from '../command-base';

/**
 * open an edit-item dialog
 *
 * import this module to commands.ts
 */
export class Edit extends CommandBase {
  constructor() {
    super();
    this.makeDef('edit',
      'Edit',
      'pencil',
      false,
      true,
      {
        params: (context) => {
          return { mode: 'edit' };
        },
        showCondition(context, settings) {
          return settings.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new Edit();
