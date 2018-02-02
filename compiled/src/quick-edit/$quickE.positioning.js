"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
/**
 * Module with everything related to positioning the quick-edit in-page editing
 */
/**
 * Point is used as return type to store X,Y coordinates
 */
var Coords = /** @class */ (function () {
    function Coords(x, y, w, yh, element // TODO: find this type
    ) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.yh = yh;
        this.element = element; // TODO: find this type
    }
    return Coords;
}());
/**
 * Prepare offset calculation based on body positioning
 * @returns Point
 */
function getBodyPosition() {
    var bodyPos = _quickE___1.$quickE.body.css('position');
    return bodyPos === 'relative' || bodyPos === 'absolute'
        ? new Coords(_quickE___1.$quickE.body.offset().left, _quickE___1.$quickE.body.offset().top)
        : new Coords(0, 0);
}
exports.getBodyPosition = getBodyPosition;
;
/**
 * Refresh content block and modules elements
 */
function refreshDomObjects() {
    _quickE___1.$quickE.bodyOffset = getBodyPosition(); // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar
    //// Cache the panes (because panes can't change dynamically)
    //if (!quickE.cachedPanes)
    //    quickE.cachedPanes = $(selectors.mod.listSelector);
    if (_quickE___1.$quickE.config.innerBlocks.enable) {
        // get all content-block lists which are empty, or which allow multiple child-items
        var lists = $(_quickE___1.selectors.cb.listSelector)
            .filter(':not(.' + _quickE___1.selectors.cb.singleItem + '), :empty');
        _quickE___1.$quickE.contentBlocks = lists // $(selectors.cb.listSelector)
            .find(_quickE___1.selectors.cb.selector)
            .add(lists); // selectors.cb.listSelector);
    }
    if (_quickE___1.$quickE.config.modules.enable)
        _quickE___1.$quickE.modules = _quickE___1.$quickE.cachedPanes
            .find(_quickE___1.selectors.mod.selector)
            .add(_quickE___1.$quickE.cachedPanes);
}
/**
 * Last time when contentblock and modules are refreshed.
 * Helps to skip unnecessary calls to refresh(e).
 */
(function (refreshDomObjects) {
})(refreshDomObjects || (refreshDomObjects = {}));
/**
 * position, align and show a menu linked to another item
 */
function positionAndAlign(element, coords) {
    return element.css({
        left: coords.x - _quickE___1.$quickE.bodyOffset.x,
        top: coords.yh - _quickE___1.$quickE.bodyOffset.y,
        width: coords.element.width()
    }).show();
}
exports.positionAndAlign = positionAndAlign;
;
/**
 * Refresh positioning / visibility of the quick-insert bar
 * @param e
 */
function refresh(e) {
    var highlightClass = 'sc-cb-highlight-for-insert';
    var newDate = new Date();
    if ((!refreshDomObjects.lastCall) || (newDate.getTime() - refreshDomObjects.lastCall.getTime() > 1000)) {
        // console.log('refreshed contentblock and modules');
        refreshDomObjects.lastCall = newDate;
        refreshDomObjects();
    }
    if (_quickE___1.$quickE.config.innerBlocks.enable && _quickE___1.$quickE.contentBlocks) {
        _quickE___1.$quickE.nearestCb = findNearest(_quickE___1.$quickE.contentBlocks, new Coords(e.clientX, e.clientY));
    }
    if (_quickE___1.$quickE.config.modules.enable && _quickE___1.$quickE.modules) {
        _quickE___1.$quickE.nearestMod = findNearest(_quickE___1.$quickE.modules, new Coords(e.clientX, e.clientY));
    }
    _quickE___1.$quickE.modActions.toggleClass('sc-invisible', _quickE___1.$quickE.nearestMod === null);
    _quickE___1.$quickE.cbActions.toggleClass('sc-invisible', _quickE___1.$quickE.nearestCb === null);
    var oldParent = _quickE___1.$quickE.main.parentContainer;
    if (_quickE___1.$quickE.nearestCb !== null || _quickE___1.$quickE.nearestMod !== null) {
        var alignTo = _quickE___1.$quickE.nearestCb || _quickE___1.$quickE.nearestMod;
        // find parent pane to highlight
        var parentPane = $(alignTo.element).closest(_quickE___1.selectors.mod.listSelector);
        var parentCbList = $(alignTo.element).closest(_quickE___1.selectors.cb.listSelector);
        var parentContainer = (parentCbList.length ? parentCbList : parentPane)[0];
        // put part of the pane-name into the button-labels
        if (parentPane.length > 0) {
            var paneName_1 = parentPane.attr('id') || '';
            if (paneName_1.length > 4)
                paneName_1 = paneName_1.substr(4);
            _quickE___1.$quickE.modActions.filter('[titleTemplate]').each(function () {
                var t = $(this);
                t.attr('title', t.attr('titleTemplate').replace('{0}', paneName_1));
            });
        }
        positionAndAlign(_quickE___1.$quickE.main, alignTo);
        // Keep current block as current on menu
        _quickE___1.$quickE.main.actionsForCb = _quickE___1.$quickE.nearestCb ? _quickE___1.$quickE.nearestCb.element : null;
        _quickE___1.$quickE.main.actionsForModule = _quickE___1.$quickE.nearestMod ? _quickE___1.$quickE.nearestMod.element : null;
        _quickE___1.$quickE.main.parentContainer = parentContainer;
        $(parentContainer).addClass(highlightClass);
    }
    else {
        _quickE___1.$quickE.main.parentContainer = null;
        _quickE___1.$quickE.main.hide();
    }
    // if previously a parent-pane was highlighted, un-highlight it now
    if (oldParent && oldParent !== _quickE___1.$quickE.main.parentContainer)
        $(oldParent).removeClass(highlightClass);
}
exports.refresh = refresh;
;
/**
 * Return the nearest element to the mouse cursor from elements (jQuery elements)
 * @param elements
 * @param position
 */
function findNearest(elements, position) {
    var maxDistance = 30; // Defines the maximal distance of the cursor when the menu is displayed
    var nearestItem = null;
    var nearestDistance = maxDistance;
    var posX = position.x + _quickE___1.$quickE.win.scrollLeft();
    var posY = position.y + _quickE___1.$quickE.win.scrollTop();
    // Find nearest element
    elements.each(function () {
        var e = getCoordinates($(this));
        // First check x coordinates - must be within container
        if (posX < e.x || posX > e.x + e.w)
            return;
        // Check if y coordinates are within boundaries
        var distance = Math.abs(posY - e.yh);
        if (distance < maxDistance && distance < nearestDistance) {
            nearestItem = e;
            nearestDistance = distance;
        }
    });
    return nearestItem;
}
;
function getCoordinates(element) {
    return {
        element: element,
        x: element.offset().left,
        w: element.width(),
        y: element.offset().top,
        // For content-block ITEMS, the menu must be visible at the end
        // For content-block-LISTS, the menu must be at top
        yh: element.offset().top + (element.is(_quickE___1.selectors.eitherCbOrMod) ? element.height() : 0)
    };
}
exports.getCoordinates = getCoordinates;
;
//# sourceMappingURL=$quickE.positioning.js.map