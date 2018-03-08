import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class TemplateQuery extends CommandBase {
  constructor() {
    super();
    this.makeDef('template-query',
      'QueryEdit',
      'filter',
      true,
      false,
      {
        dialog: 'pipeline-designer',
        params: (context) => {
          return { pipelineId: context.contentBlock.queryId };
        },
        newWindow: true,
        // ReSharper disable UnusedParameter
        disabled: (context, settings) => {
          // ReSharper restore UnusedParameter
          return context.app.settingsId === null;
        },
        title: (context) => `Toolbar.QueryEdit${context.contentBlock.queryId === null ? 'Disabled' : ''}`,
        // ReSharper disable UnusedParameter
        showCondition: (context, settings) => {
          // ReSharper restore UnusedParameter
          return context.user.canDesign && !context.app.isContent;
        },
        // ReSharper disable once UnusedParameter
        dynamicClasses: (context, settings) => {
          return context.contentBlock.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new TemplateQuery();
