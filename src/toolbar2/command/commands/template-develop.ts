﻿import { CommandBase } from '../command-base';

export class TemplateDevelop extends CommandBase {
  constructor() {
    super();
    this.makeDef('template-develop',
      'Develop',
      'code',
      true,
      false,
      {
        newWindow: true,
        dialog: 'develop',
        showCondition: (context, settings, modConfig) => {
          return context.enableTools;
        },
        configureCommand: (context, cmd) => {
          cmd.items = [{ EntityId: context.cmdSpec.templateId }];
        },
      });
  }
}
