import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
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
        showCondition: (context, settings) => {
          return context.user.canDesign && !context.app.isContent;
        },
        configureCommand: (context, cmd) => {
          cmd.items = [{ EntityId: context.contentBlock.templateId }];
        },
      });
  }
}

const cmd = new TemplateSettings();
