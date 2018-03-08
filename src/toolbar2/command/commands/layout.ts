import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class Layout extends CommandBase {
  constructor() {
    super();
    this.makeDef('layout',
      'ChangeLayout',
      'glasses',
      true,
      true,
      {
        inlineWindow: true,
      });
  }
}

const cmd = new Layout();
