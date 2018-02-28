import { CommandBase } from '../command-base';

export class TemplateDevelop extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('template-develop',
      'Develop',
      'code',
      true,
      false,
      {
        newWindow: true,
        dialog: 'develop',
        showCondition: (settings, modConfig) => {
          return this.enableTools;
        },
        configureCommand: (cmd) => {
          cmd.items = [{ EntityId: cmdSpecs.templateId }];
        },
      });
  }
}
