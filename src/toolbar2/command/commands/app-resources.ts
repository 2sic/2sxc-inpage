import { CommandBase } from '../command-base';

export class AppResources extends CommandBase {
  constructor() {
    super();
    this.makeDef('app-resources', 'AppResources', 'language', true, false, {
      dialog: 'edit',
      // ReSharper disable UnusedParameter
      disabled: (context, settings) => {
        // ReSharper restore UnusedParameter
        return context.app.resourcesId === null;
      },
      title: (context) => `Toolbar.AppResources${context.app.resourcesId === null ? 'Disabled' : ''}`,
      // ReSharper disable UnusedParameter
      showCondition: (context, settings) => {
        // ReSharper restore UnusedParameter
        return context.user.canDesign && !context.app.isContent; // only if resources exist or are 0 (to be created)...
      },
      configureCommand: (context, cmd) => {
        cmd.items = [{ EntityId: context.app.resourcesId }];
      },
      // ReSharper disable once UnusedParameter
      dynamicClasses: (context, settings) => {
        return context.app.resourcesId !== null ? '' : 'empty';  // if it doesn't have a query, make it less strong
      },
    });
  }
}
