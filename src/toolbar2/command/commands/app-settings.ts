import { CommandBase } from '../command-base';

export class AppSettings extends CommandBase {
  constructor() {
    super();
    this.makeDef('app-settings', 'AppSettings', 'sliders', true, false, {
      dialog: 'edit',
      // ReSharper disable UnusedParameter
      disabled: (context, settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return context.cmdSpec.appSettingsId === null;
      },
      title: (context) => `Toolbar.AppSettings${context.cmdSpec.appSettingsId === null ? 'Disabled' : ''}`,
      // ReSharper disable UnusedParameter
      showCondition: (context, settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return context.enableTools && !context.isContent; // only if settings exist, or are 0 (to be created)
      },
      configureCommand: (context, cmd) => {
        cmd.items = [{ EntityId: context.cmdSpec.appSettingsId }];
      },
      // ReSharper disable once UnusedParameter
      dynamicClasses: (context, settings) => {
        return context.cmdSpec.appSettingsId !== null ? '' : 'empty';  // if it doesn't have a query, make it less strong
      },
    });
  }
}
