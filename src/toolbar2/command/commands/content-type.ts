import { CommandBase } from '../command-base';

export class ContentType extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('contenttype', 'ContentType', 'fields', true, false, {
      // ReSharper disable UnusedParameter
      showCondition: (settings, modConfig) => {
        // ReSharper restore UnusedParameter
        return this.enableTools;
      },
    });
  }
}
