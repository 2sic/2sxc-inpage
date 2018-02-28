import {CommandBase} from '../command-base';

/**
 * open an edit-item dialog
 */
export class Edit extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('edit',
      'Edit',
      'pencil',
      false,
      true,
      {
        params: { mode: 'edit' },
        showCondition(settings, modConfig) {
          return settings.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
        },
      });
  }
}
