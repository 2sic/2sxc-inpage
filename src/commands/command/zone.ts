import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class Zone extends CommandBase {
  constructor() {
    super();
    this.makeDef('zone',
      'Zone',
      'manage',
      true,
      false,
      {
        // ReSharper disable UnusedParameter
        showCondition: (context, settings) => {
          // ReSharper restore UnusedParameter
          return context.user.canDesign;
        },
      });
  }
}

const cmd = new Zone();
