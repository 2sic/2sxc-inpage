import { CommandBase } from '../command-base';

export class App extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('app', 'App', 'settings', true, false, {
      // ReSharper disable UnusedParameter
      showCondition: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return this.enableTools;
      },
    });
  }
}
