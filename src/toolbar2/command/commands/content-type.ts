import { CommandBase } from '../command-base';

export class ContentType extends CommandBase {
  constructor() {
    super();
    this.makeDef('contenttype', 'ContentType', 'fields', true, false, {
      // ReSharper disable UnusedParameter
      showCondition: (context, settings) => {
        // ReSharper restore UnusedParameter
        return context.user.canDesign;
      },
    });
  }
}
