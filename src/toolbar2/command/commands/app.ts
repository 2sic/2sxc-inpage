﻿import { CommandBase } from '../command-base';

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
