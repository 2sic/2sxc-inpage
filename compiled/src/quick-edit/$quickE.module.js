"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var quick_e_1 = require("./quick-e");
var clipboard_1 = require("./clipboard");
var _quickE_modManage_1 = require("./$quickE.modManage");
var selectors_instance_1 = require("./selectors-instance");
var mm = new _quickE_modManage_1.modManage();
/**
 * module specific stuff
 */
function onModuleButtonClick() {
    var type = $(this).data('type'), dnnMod = quick_e_1.$quickE.main.actionsForModule, pane = dnnMod.closest(selectors_instance_1.selectors.mod.listSelector), index = 0;
    if (dnnMod.hasClass('DnnModule'))
        index = pane.find('.DnnModule').index(dnnMod[0]) + 1;
    var cbAction = $(this).data('action');
    if (cbAction) {
        return clipboard_1.copyPasteInPage(cbAction, pane, index, selectors_instance_1.selectors.mod.id); // copy/paste
    }
    return mm.create(mm.getPaneName(pane), index, type);
}
/**
 * bind module actions click
 */
quick_e_1.$quickE.modActions.click(onModuleButtonClick);
//# sourceMappingURL=$quickE.module.js.map