import { CommandBase } from '../command-base';

export class AppResources extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('app-resources', 'AppResources', 'language', true, false, {
      dialog: 'edit',
      // ReSharper disable UnusedParameter
      disabled: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return cmdSpecs.appResourcesId === null;
      },
      title: 'Toolbar.AppResources' + (cmdSpecs.appResourcesId === null ? 'Disabled' : ''),
      // ReSharper disable UnusedParameter
      showCondition: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return this.enableTools && !this.isContent; // only if resources exist or are 0 (to be created)...
      },
      configureCommand: (cmd) => {
        cmd.items = [{ EntityId: cmdSpecs.appResourcesId }];
      },
      // ReSharper disable once UnusedParameter
      dynamicClasses: (settings) => {
        return cmdSpecs.appResourcesId !== null ? '' : 'empty';  // if it doesn't have a query, make it less strong
      },
    });
  }
}
