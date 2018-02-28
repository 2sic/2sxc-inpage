import { CommandBase } from '../command-base';

/**
 * open the import dialog
 */
export class AppImport extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('app-import', 'Dashboard', '', true, false, {});
  }
}
