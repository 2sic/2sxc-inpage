import { CommandBase } from '../command-base';

export class AppResources extends CommandBase {
  constructor() {
    super();
    this.makeDef('app-resources', 'AppResources', 'language', true, false, {
      dialog: 'edit',
      // ReSharper disable UnusedParameter
      disabled: (context, settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return context.cmdSpec.appResourcesId === null;
      },
      title: (context) => `Toolbar.AppResources${context.cmdSpec.appResourcesId === null ? 'Disabled' : ''}`,
      // ReSharper disable UnusedParameter
      showCondition: (context, settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return context.enableTools && !context.isContent; // only if resources exist or are 0 (to be created)...
      },
      configureCommand: (context, cmd) => {
        cmd.items = [{ EntityId: context.cmdSpec.appResourcesId }];
      },
      // ReSharper disable once UnusedParameter
      dynamicClasses: (context, settings) => {
        return context.cmdSpec.appResourcesId !== null ? '' : 'empty';  // if it doesn't have a query, make it less strong
      },
    });
  }
}
