import { addItem } from '../../../contentBlock/actions';
import { CommandBase } from '../command-base';

/**
 * add brings no dialog, just add an empty item
 */
export class Add extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('add',
      'AddDemo',
      'plus-circled',
      false,
      true,
      {
        showCondition(settings, modConfig) {
          return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code(settings, event, sxc) {
          addItem(sxc, settings.sortOrder + 1);
        },
      });
  }
}
