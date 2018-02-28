import { CommandBase } from '../command-base';

export class AppImport extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('app-import', 'Dashboard', '', true, false, {});
  }
}
