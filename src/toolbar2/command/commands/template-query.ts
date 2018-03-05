import { CommandBase } from '../command-base';

export class TemplateQuery extends CommandBase {
  constructor() {
    super();
    this.makeDef('template-query', 'QueryEdit', 'filter', true, false, {
      dialog: 'pipeline-designer',
      params: (context) => {
        return { pipelineId: context.cmdSpec.queryId };
      },
      newWindow: true,
      // ReSharper disable UnusedParameter
      disabled: (context, settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return context.cmdSpec.appSettingsId === null;
      },
      title: (context) => `Toolbar.QueryEdit${context.cmdSpec.queryId === null ? 'Disabled' : ''}`,
      // ReSharper disable UnusedParameter
      showCondition: (context, settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return context.enableTools && !context.isContent;
      },
      // ReSharper disable once UnusedParameter
      dynamicClasses: (context, settings) => {
        return context.cmdSpec.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
      },
    });
  }
}
