import { CommandBase } from '../command-base';

/**
 * import this module to commands.ts
 */
export class More extends CommandBase {
  constructor() {
    super();
    this.makeDef(
      'more',
      'MoreActions',
      'options btn-mode',
      true,
      false,
      {
        code(context, event) {

          // jQuery varsion
          //const btn: any = $(event.target);
          //const fullMenu: any = btn.closest('ul.sc-menu');
          //const oldState = Number(fullMenu.attr('data-state') || 0);
          //const max = Number(fullMenu.attr('group-count'));
          //const newState = (oldState + 1) % max;

          //fullMenu.removeClass(`group-${oldState}`)
          //  .addClass(`group-${newState}`)
          //  .attr('data-state', newState);

          // JavaScript native version
          const btn2: Element = event.target;
          const fullMenu2: Element = btn2.closest('ul.sc-menu');
          const oldState2 = Number(fullMenu2.getAttribute('data-state') || 0);
          const max2 = Number(fullMenu2.getAttribute('group-count'));
          const newState2 = (oldState2 + 1) % max2;

          fullMenu2.classList.remove(`group-${oldState2}`);
          fullMenu2.classList.add(`group-${newState2}`);
          fullMenu2.setAttribute('data-state', String(newState2));
          //(fullMenu2 as HTMLElement).style.opacity = '1';
          (fullMenu2 as HTMLElement).style.backgroundColor = 'red';
          console.log('stv: more click ', event.target);

          event.preventDefault();

          const scElement: Element = fullMenu2.closest('.sc-element');

          function mouseenterHandler(e: MouseEvent) {
            // remove this handler
            //scElement.removeEventListener('mouseenter', mouseenterHandler);
            //console.log('stv: scElement mouseenter removed');
            (fullMenu2 as HTMLElement).style.opacity = '1';
            console.log('stv: scElement mouseenter ', e.target);
          }

          function mouseleaveHandler(e: MouseEvent) {
            console.log("stv: scElement mouseleave", e.screenX, e.screenY, e.target); 
            if (e.screenX != 0 && e.screenY != 0) {
              // remove this handler
              //scElement.removeEventListener('mouseleave', mouseleaveHandler);
              //console.log('stv: scElement mouseleave removed');
              (fullMenu2 as HTMLElement).style.opacity = '0';
              console.log('stv: menu hidden');
            }
           
          }

          if (fullMenu2.getAttribute('listener') !== 'true') {
            fullMenu2.setAttribute('listener', 'true');
            scElement.addEventListener('mouseenter', mouseenterHandler);
            console.log('stv: scElement mouseenter added');
            scElement.addEventListener('mouseleave', mouseleaveHandler);
            console.log('stv: scElement mouseleave added');
          }



          //fullMenu2.classList.remove('sc-tb-show-hover');
          //fullMenu2.classList.add('sc-tb-show-hover');

          //.removeClass('sc-tb-show-hover')
          //.addClass('sc-tb-show-hover');

          //let offset = btn.offset();
          //let eventMouseDown = $.Event("mousedown", {
          //  which: 1,
          //  pageX: offset.left,
          //  pageY: offset.top
          //});
          //btn.trigger(eventMouseDown);
          //debugger;

          //return new Promise(function(resolve, reject) {
          //  fullMenu.removeClass(`group-${oldState}`)
          //    .addClass(`group-${newState}`)
          //    .attr('data-state', newState);
          //}).then(function (rez) {
          //  return fullMenu.children().children(`group-${oldState}`).css('z-index', 1499).css('display', 'none');
          //}).then(function(rez) {
          //  return fullMenu.children().children(`group-${newState}`).css('z-index', 1500).css('display', 'inline-block');
          //});


        },
      });
  }
}

// ReSharper disable once UnusedLocals
const cmd = new More();
