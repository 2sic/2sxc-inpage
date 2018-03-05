import { CommandBase } from '../command-base';

/**
 * open the import dialog
 */
export class AppImport extends CommandBase {
  constructor() {
    super();
    this.makeDef('app-import', 'Dashboard', '', true, false, {});
  }
}
