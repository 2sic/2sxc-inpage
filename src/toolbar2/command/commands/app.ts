import { CommandBase } from '../command-base';
/**
 * import this module to commands.ts
 */
export class App extends CommandBase {
  constructor() {
    super();
    this.makeDef('app', 'App', 'settings', true, false, {
      // ReSharper disable UnusedParameter
      showCondition: (context, settings) => {
        // ReSharper restore UnusedParameter
        return context.user.canDesign;
      },
    });
  }
}

const cmd = new App();
