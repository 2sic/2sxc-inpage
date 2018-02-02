"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
var _quickE_positioning_1 = require("./$quickE.positioning");
var _quickE_cmds_1 = require("./$quickE.cmds");
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
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
function copyPasteInPage(cbAction, list, index, type) {
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
            if (isNaN(from) || isNaN(to) || from === to)
                return clipboard.clear(); // don't do anything
            // cb-numbering is a bit different, because the selector is at the bottom
            // only there we should also skip on +1;
            if (newClip.type === _quickE___1.selectors.cb.id && from + 1 === to)
                return clipboard.clear(); // don't do anything
            if (type === _quickE___1.selectors.cb.id) {
                module_bootstrapper_1.$2sxc(list).manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
            }
            else {
                // sometimes missing oldClip.item
                // if (clipboard.data.item)
                _quickE_cmds_1.mod.move(clipboard.data, newClip, from, to);
            }
            clipboard.clear();
            break;
        default:
    }
    return null;
}
exports.copyPasteInPage = copyPasteInPage;
;
/**
 * clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
 */
var clipboard;
(function (clipboard) {
    clipboard.data = {};
    function mark(newData) {
        if (newData) {
            // if it was already selected with the same thing, then release it
            if (clipboard.data && clipboard.data.item === newData.item)
                return clear();
            clipboard.data = newData;
        }
        $('.' + _quickE___1.selectors.selected).removeClass(_quickE___1.selectors.selected); // clear previous markings
        // sometimes missing data.item
        if (!clipboard.data.item) {
            return;
        }
        var cb = $(clipboard.data.item);
        cb.addClass(_quickE___1.selectors.selected);
        if (cb.prev().is('iframe'))
            cb.prev().addClass(_quickE___1.selectors.selected);
        setSecondaryActionsState(true);
        _quickE___1.$quickE.selected.toggle(cb, clipboard.data.type);
    }
    clipboard.mark = mark;
    function clear() {
        $('.' + _quickE___1.selectors.selected).removeClass(_quickE___1.selectors.selected);
        clipboard.data = null;
        setSecondaryActionsState(false);
        _quickE___1.$quickE.selected.toggle(false);
    }
    clipboard.clear = clear;
    function createSpecs(type, list, index) {
        var listItems = list.find(_quickE___1.selectors[type].selector);
        if (index >= listItems.length)
            index = listItems.length - 1; // sometimes the index is 1 larger than the length, then select last
        var currentItem = listItems[index];
        var editContext = JSON.parse(list.attr(_quickE___1.selectors.cb.context) || null) || { parent: 'dnn', field: list.id };
        return { parent: editContext.parent, field: editContext.field, list: list, item: currentItem, index: index, type: type };
    }
    clipboard.createSpecs = createSpecs;
})(clipboard = exports.clipboard || (exports.clipboard = {}));
;
function setSecondaryActionsState(state) {
    var btns = $('a.sc-content-block-menu-btn');
    btns = btns.filter('.icon-sxc-paste');
    btns.toggleClass('sc-unavailable', !state);
}
;
_quickE___1.$quickE.selected.toggle = function (target) {
    if (!target || target.length === 0)
        return _quickE___1.$quickE.selected.hide();
    var coords = _quickE_positioning_1.getCoordinates(target);
    coords.yh = coords.y + 20;
    _quickE_positioning_1.positionAndAlign(_quickE___1.$quickE.selected, coords);
    _quickE___1.$quickE.selected.target = target;
};
var cmdsStrategyFactory = new _quickE_cmds_1.CmdsStrategyFactory();
/**
 * bind clipboard actions
 */
$('a', _quickE___1.$quickE.selected).click(function () {
    var action = $(this).data('action');
    var clip = clipboard.data;
    switch (action) {
        case 'delete':
            return cmdsStrategyFactory.delete(clip);
        case 'sendToPane':
            return _quickE_cmds_1.mod.sendToPane();
    }
});
//# sourceMappingURL=$quickE.clipboard.js.map