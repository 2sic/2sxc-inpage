import { CommandBase } from '../command-base';

export class Layout extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('layout', 'ChangeLayout', 'glasses', true, true, {
      inlineWindow: true,
    });
  }
}
