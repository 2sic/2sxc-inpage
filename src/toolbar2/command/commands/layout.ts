import { CommandBase } from '../command-base';

export class Layout extends CommandBase {
  constructor() {
    super();
    this.makeDef('layout', 'ChangeLayout', 'glasses', true, true, {
      inlineWindow: true,
    });
  }
}
