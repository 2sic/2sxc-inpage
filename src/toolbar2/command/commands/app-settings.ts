import { CommandBase } from '../command-base';

export class AppSettings extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('app-settings', 'AppSettings', 'sliders', true, false, {
      dialog: 'edit',
      // ReSharper disable UnusedParameter
      disabled: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return cmdSpecs.appSettingsId === null;
      },
      title: 'Toolbar.AppSettings' + (cmdSpecs.appSettingsId === null ? 'Disabled' : ''),
      // ReSharper disable UnusedParameter
      showCondition: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return this.enableTools && !this.isContent; // only if settings exist, or are 0 (to be created)
      },
      configureCommand: (cmd) => {
        cmd.items = [{ EntityId: cmdSpecs.appSettingsId }];
      },
      // ReSharper disable once UnusedParameter
      dynamicClasses: (settings) => {
        return cmdSpecs.appSettingsId !== null ? '' : 'empty';  // if it doesn't have a query, make it less strong
      },
    });
  }
}
