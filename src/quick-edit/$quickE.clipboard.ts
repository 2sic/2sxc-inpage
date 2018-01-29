import { $quickE as quickE, selectors } from './$quickE.{}';
import { positionAndAlign, getCoordinates } from './$quickE.positioning';
import { cb, mod, CmdsStrategyFactory } from './$quickE.cmds';

/**
 * add a clipboard to the quick edit
 */

/**
 * perform copy and paste commands - needs the clipboard
 * @param cbAction
 * @param list
 * @param index
 * @param type
 */
export function copyPasteInPage(cbAction: string, list: any, index: number, type: any): any {
  var newClip = clipboard.createSpecs(type, list, index);

  // action!
  switch (cbAction) {
    case 'select':
      clipboard.mark(newClip);
      break;
    case 'paste':
      var from = clipboard.data.index;
      var to = newClip.index;
      // check that we only move block-to-block or module to module
      if (clipboard.data.type !== newClip.type)
        return alert("can't move module-to-block; move only works from module-to-module or block-to-block");

      if (isNaN(from) || isNaN(to) || from === to) // || from + 1 === to) // this moves it to the same spot, so ignore
        return clipboard.clear(); // don't do anything

      // cb-numbering is a bit different, because the selector is at the bottom
      // only there we should also skip on +1;
      if (newClip.type === selectors.cb.id && from + 1 === to)
        return clipboard.clear(); // don't do anything

      if (type === selectors.cb.id) {
        $2sxc(list).manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
      } else {
        mod.move(clipboard.data, newClip, from, to);
      }
      clipboard.clear();
      break;
    default:
  }
  return null;
};

/**
 * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
 */
export namespace clipboard {
  export var data: any = {};

  export function mark(newData) {
    if (newData) {
      // if it was already selected with the same thing, then release it
      if (data && data.item === newData.item)
        return clear();
      data = newData;
    }
    $('.' + selectors.selected).removeClass(selectors.selected); // clear previous markings
    var cb = $(data.item);
    cb.addClass(selectors.selected);
    if (cb.prev().is('iframe'))
      cb.prev().addClass(selectors.selected);
    setSecondaryActionsState(true);
    quickE.selected.toggle(cb, data.type);
  }

  export function clear() {
    $('.' + selectors.selected).removeClass(selectors.selected);
    data = null;
    setSecondaryActionsState(false);
    quickE.selected.toggle(false);
  }

  export function createSpecs(type, list, index) {
    var listItems = list.find(selectors[type].selector);
    if (index >= listItems.length) index = listItems.length - 1; // sometimes the index is 1 larger than the length, then select last
    var currentItem = listItems[index];
    var editContext = JSON.parse(list.attr(selectors.cb.context) || null) || { parent: 'dnn', field: list.id };
    return { parent: editContext.parent, field: editContext.field, list: list, item: currentItem, index: index, type: type };
  }
};


function setSecondaryActionsState(state) {
  var btns = $('a.sc-content-block-menu-btn');
  btns = btns.filter('.icon-sxc-paste');
  btns.toggleClass('sc-unavailable', !state);
};


quickE.selected.toggle = function (target) {
  if (!target)
    return quickE.selected.hide();

  var coords = getCoordinates(target);
  coords.yh = coords.y + 20;
  positionAndAlign(quickE.selected, coords);
  quickE.selected.target = target;
};

let cmdsStrategyFactory = new CmdsStrategyFactory();

/**
 * bind clipboard actions
 */ 
$('a', quickE.selected).click(function () {
  var action = $(this).data('action');
  var clip = clipboard.data;
  switch (action) {
    case 'delete':
      return cmdsStrategyFactory.delete(clip);
    case 'sendToPane':
      return mod.sendToPane();
  }
});
