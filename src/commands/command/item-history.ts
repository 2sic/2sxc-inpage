import { CommandBase } from '../command-base';

/**
 * show the version dialog
 *
 * import this module to commands.ts
 */
export class ItemHistory extends CommandBase {
  constructor() {
    super();
    this.makeDef('item-history',
      'ItemHistory',
      'clock',
      true,
      false,
      {
        inlineWindow: true,
        fullScreen: true,
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new ItemHistory();
