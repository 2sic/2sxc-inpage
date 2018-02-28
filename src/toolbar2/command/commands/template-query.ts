import { CommandBase } from '../command-base';

export class TemplateQuery extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('template-query', 'QueryEdit', 'filter', true, false, {
      dialog: 'pipeline-designer',
      params: { pipelineId: cmdSpecs.queryId },
      newWindow: true,
      // ReSharper disable UnusedParameter
      disabled: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return cmdSpecs.appSettingsId === null;
      },
      title: 'Toolbar.QueryEdit' + (cmdSpecs.queryId === null ? 'Disabled' : ''),
      // ReSharper disable UnusedParameter
      showCondition: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return this.enableTools && !this.isContent;
      },
      // ReSharper disable once UnusedParameter
      dynamicClasses: (settings) => {
        return cmdSpecs.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
      },
    });
  }
}
