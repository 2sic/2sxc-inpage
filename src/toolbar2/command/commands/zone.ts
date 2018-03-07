import { CommandBase } from '../command-base';

export class Zone extends CommandBase {
  constructor() {
    super();
    this.makeDef('zone', 'Zone', 'manage', true, false, {
      // ReSharper disable UnusedParameter
      showCondition: (context, settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return context.user.canDesign;
      },
    });
  }
}
