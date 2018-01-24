"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
var _quickE_clipboard_1 = require("./$quickE.clipboard");
var _quickE_modManage_1 = require("./$quickE.modManage");
var mm = new _quickE_modManage_1.modManage();
/**
 * module specific stuff
 */
function onModuleButtonClick() {
    var type = $(this).data("type"), dnnMod = $quickE.main.actionsForModule, pane = dnnMod.closest(_quickE___1.selectors.mod.listSelector), index = 0;
    if (dnnMod.hasClass("DnnModule"))
        index = pane.find(".DnnModule").index(dnnMod[0]) + 1;
    var cbAction = $(this).data("action");
    if (cbAction) {
        return _quickE_clipboard_1.copyPasteInPage(cbAction, pane, index, _quickE___1.selectors.mod.id); // copy/paste
    }
    return mm.create(mm.getPaneName(pane), index, type);
}
/**
 * bind module actions click
 */
$quickE.modActions.click(onModuleButtonClick);
//# sourceMappingURL=$quickE.module.js.map