﻿import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class More extends CommandBase {
  constructor() {
    super();
    this.makeDef('more', 'MoreActions', 'options btn-mode', true, false, {
      code(context, settings) {
        const btn: any = $(context.element);
        const fullMenu: any = btn.closest('ul.sc-menu');
        const oldState: number = Number(fullMenu.attr('data-state') || 0);
        const max: number = Number(fullMenu.attr('group-count'));
        const newState: number = (oldState + 1) % max;

        fullMenu.removeClass('group-' + oldState)
          .addClass('group-' + newState)
          .attr('data-state', newState);
      },
    });
  }
}

const cmd = new More();
