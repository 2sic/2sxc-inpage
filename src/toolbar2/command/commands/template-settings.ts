import { CommandBase } from '../command-base';

export class TemplateSettings extends CommandBase {
  constructor() {
    super();
    this.makeDef('template-settings',
      'TemplateSettings',
      'sliders',
      true,
      false,
      {
        dialog: 'edit',
        showCondition: (context, settings, modConfig) => {
          return context.user.canDesign && !context.app.isContent;
        },
        configureCommand: (context, cmd) => {
          cmd.items = [{ EntityId: context.contentBlock.templateId }];
        },
      });
  }
}
