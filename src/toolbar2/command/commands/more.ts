import { CommandBase } from '../command-base';

export class More extends CommandBase {
  constructor(cmdSpecs) {
    super(cmdSpecs);
    this.makeDef('more', 'MoreActions', 'options btn-mode', true, false, {
      code(settings, event, sxc) {
        const btn: any = $(event.target);
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
