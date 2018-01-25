import { selectors } from './$quickE.{}';

/**
 * Module with everything related to positioning the quick-edit in-page editing
 */

/**
 * Point is used as return type to store X,Y coordinates
 */
class Coords {
  constructor(
    public x: number,
    public y: number,
    public w?: number,
    public yh?: number,
    public element?: any // TODO: find this type
  ) { }
}

/**
 * Prepare offset calculation based on body positioning
 * @returns Point 
 */
export function getBodyPosition(): Coords {
  var bodyPos = $quickE.body.css('position');
  return bodyPos === 'relative' || bodyPos === 'absolute'
    ? new Coords($quickE.body.offset().left, $quickE.body.offset().top)
    : new Coords(0,0);
};

/**
 * Refresh content block and modules elements
 */ 
function refreshDomObjects(): void {
  $quickE.bodyOffset = getBodyPosition(); // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar

  //// Cache the panes (because panes can't change dynamically)
  //if (!$quickE.cachedPanes)
  //    $quickE.cachedPanes = $(selectors.mod.listSelector);

  if ($quickE.config.innerBlocks.enable) {
    // get all content-block lists which are empty, or which allow multiple child-items
    var lists = $(selectors.cb.listSelector)
      .filter(':not(.' + selectors.cb.singleItem + '), :empty');
    $quickE.contentBlocks = lists // $(selectors.cb.listSelector)
      .find(selectors.cb.selector)
      .add(lists);// selectors.cb.listSelector);
  }
  if ($quickE.config.modules.enable)
    $quickE.modules = $quickE.cachedPanes
      .find(selectors.mod.selector)
      .add($quickE.cachedPanes);
}

/**
 * Last time when contentblock and modules are refreshed.
 * Helps to skip unnecessary calls to refresh(e).
 */
namespace refreshDomObjects {
  export var lastCall: Date;
}

/**
 * position, align and show a menu linked to another item
 */ 
export function positionAndAlign(element: any, coords: Coords) {
  return element.css({
    left: coords.x - $quickE.bodyOffset.x,
    top: coords.yh - $quickE.bodyOffset.y,
    width: coords.element.width()
  }).show();
};

/**
 * Refresh positioning / visibility of the quick-insert bar
 * @param e
 */
export function refresh(e) {
  let highlightClass: string = 'sc-cb-highlight-for-insert';
  let newDate: Date = new Date();
  if ((!refreshDomObjects.lastCall) || (newDate.getTime() - refreshDomObjects.lastCall.getTime() > 1000)) {
    // console.log('refreshed contentblock and modules');
    refreshDomObjects.lastCall = newDate;
    refreshDomObjects();
  }

  if ($quickE.config.innerBlocks.enable && $quickE.contentBlocks) {
    $quickE.nearestCb = findNearest($quickE.contentBlocks, new Coords(e.clientX, e.clientY));
  }

  if ($quickE.config.modules.enable && $quickE.modules) {
    $quickE.nearestMod = findNearest($quickE.modules, new Coords(e.clientX, e.clientY));
  }

  $quickE.modActions.toggleClass('sc-invisible', $quickE.nearestMod === null);
  $quickE.cbActions.toggleClass('sc-invisible', $quickE.nearestCb === null);

  var oldParent = $quickE.main.parentContainer;

  if ($quickE.nearestCb !== null || $quickE.nearestMod !== null) {
    var alignTo = $quickE.nearestCb || $quickE.nearestMod;

    // find parent pane to highlight
    var parentPane = $(alignTo.element).closest(selectors.mod.listSelector);
    var parentCbList = $(alignTo.element).closest(selectors.cb.listSelector);
    var parentContainer = (parentCbList.length ? parentCbList : parentPane)[0];

    // put part of the pane-name into the button-labels
    if (parentPane.length > 0) {
      let paneName: string = parentPane.attr('id') || '';
      if (paneName.length > 4) paneName = paneName.substr(4);
      $quickE.modActions.filter('[titleTemplate]').each(function () {
        var t = $(this);
        t.attr('title', t.attr('titleTemplate').replace('{0}', paneName));
      });
    }

    positionAndAlign($quickE.main, alignTo);

    // Keep current block as current on menu
    $quickE.main.actionsForCb = $quickE.nearestCb ? $quickE.nearestCb.element : null;
    $quickE.main.actionsForModule = $quickE.nearestMod ? $quickE.nearestMod.element : null;
    $quickE.main.parentContainer = parentContainer;
    $(parentContainer).addClass(highlightClass);
  } else {
    $quickE.main.parentContainer = null;
    $quickE.main.hide();
  }

  // if previously a parent-pane was highlighted, un-highlight it now
  if (oldParent && oldParent !== $quickE.main.parentContainer)
    $(oldParent).removeClass(highlightClass);
};

/**
 * Return the nearest element to the mouse cursor from elements (jQuery elements)
 * @param elements
 * @param position
 */
function findNearest(elements: any, position: Coords): Coords {
  const maxDistance: number = 30; // Defines the maximal distance of the cursor when the menu is displayed

  let nearestItem = null;
  let nearestDistance: number = maxDistance;

  let posX: number = position.x + $quickE.win.scrollLeft();
  let posY: number = position.y + $quickE.win.scrollTop();

  // Find nearest element
  elements.each(function () {
    let e: Coords = getCoordinates($(this));

    // First check x coordinates - must be within container
    if (posX < e.x || posX > e.x + e.w)
      return;

    // Check if y coordinates are within boundaries
    let distance: number = Math.abs(posY - e.yh);

    if (distance < maxDistance && distance < nearestDistance) {
      nearestItem = e;
      nearestDistance = distance;
    }
  });

  return nearestItem;
};

export function getCoordinates(element: any): Coords {
  return {
    element: element,
    x: element.offset().left,
    w: element.width(),
    y: element.offset().top,
    // For content-block ITEMS, the menu must be visible at the end
    // For content-block-LISTS, the menu must be at top
    yh: element.offset().top + (element.is(selectors.eitherCbOrMod) ? element.height() : 0)
  };
};
