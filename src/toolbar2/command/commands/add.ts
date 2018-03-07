﻿import { addItem } from '../../../contentBlock/actions';
import { CommandBase } from '../command-base';

/**
 * add brings no dialog, just add an empty item
 */
export class Add extends CommandBase {
  constructor() {
    super();
    this.makeDef('add',
      'AddDemo',
      'plus-circled',
      false,
      true,
      {
        showCondition(context, settings) {
          return context.contentBlock.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code(context, settings) {
          addItem(context.sxc.sxc, settings.sortOrder + 1);
        },
      });
  }
}
