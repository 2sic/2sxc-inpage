"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
var _quickE_clipboard_1 = require("./$quickE.clipboard");
/**
 * content-block specific stuff like actions
 */
function onCbButtonClick() {
    var list = _quickE___1.$quickE.main.actionsForCb.closest(_quickE___1.selectors.cb.listSelector);
    var listItems = list.find(_quickE___1.selectors.cb.selector);
    var actionConfig = JSON.parse(list.attr(_quickE___1.selectors.cb.context));
    var index = 0;
    var newGuid = actionConfig.guid || null;
    if (_quickE___1.$quickE.main.actionsForCb.hasClass(_quickE___1.selectors.cb.class))
        index = listItems.index(_quickE___1.$quickE.main.actionsForCb[0]) + 1;
    // check cut/paste
    var cbAction = $(this).data("action");
    if (cbAction) {
        // this is a cut/paste action
        return _quickE_clipboard_1.copyPasteInPage(cbAction, list, index, _quickE___1.selectors.cb.id);
    }
    else {
        var appOrContent = $(this).data("type");
        return _quickE___1.$quickE.cmds.cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
    }
}
_quickE___1.$quickE.cbActions.click(onCbButtonClick);
//# sourceMappingURL=$quickE.content-block.js.map