import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class More extends CommandBase {
  constructor() {
    super();
    this.makeDef('more',
      'MoreActions',
      'options btn-mode',
      true,
      false,
      {
        code(context, event) {
          const btn: any = $(event.target);
          const fullMenu: any = btn.closest('ul.sc-menu');
          const oldState = Number(fullMenu.attr('data-state') || 0);
          const max = Number(fullMenu.attr('group-count'));
          const newState = (oldState + 1) % max;

          fullMenu.removeClass(`group-${oldState}`)
            .addClass(`group-${newState}`)
            .attr('data-state', newState);
        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new More();
