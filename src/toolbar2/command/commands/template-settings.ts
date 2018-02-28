import { CommandBase } from '../command-base';

export class TemplateSettings extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('template-settings',
      'TemplateSettings',
      'sliders',
      true,
      false,
      {
        dialog: 'edit',
        showCondition: (settings, modConfig) => {
          return this.enableTools && !this.isContent;
        },
        configureCommand: (cmd) => {
          cmd.items = [{ EntityId: cmdSpecs.templateId }];
        },
      });
  }
}
