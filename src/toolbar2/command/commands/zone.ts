import { CommandBase } from '../command-base';

export class Zone extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('zone', 'Zone', 'manage', true, false, {
      // ReSharper disable UnusedParameter
      showCondition: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return this.enableTools;
      },
    });
  }
}
