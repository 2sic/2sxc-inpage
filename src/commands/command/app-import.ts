import { CommandBase } from '../command-base';

/**
 * open the import dialog
 * 
 * import this module to commands.ts
 */
export class AppImport extends CommandBase {
  constructor() {
    super();
    this.makeDef('app-import', 'Dashboard', '', true, false, {});
  }
}

// open the import dialog
const cmd = new AppImport();
