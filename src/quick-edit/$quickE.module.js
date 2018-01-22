"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE_modManage_1 = require("./$quickE.modManage");
var mm = new _quickE_modManage_1.default();
// module specific stuff
function onModuleButtonClick() {
    var type = $(this).data("type"), dnnMod = $quickE.main.actionsForModule, pane = dnnMod.closest($quickE.selectors.mod.listSelector), index = 0;
    if (dnnMod.hasClass("DnnModule"))
        index = pane.find(".DnnModule").index(dnnMod[0]) + 1;
    var cbAction = $(this).data("action");
    if (cbAction)
        return $quickE.copyPasteInPage(cbAction, pane, index, $quickE.selectors.mod.id);
    return mm.create(mm.getPaneName(pane), index, type);
}
// bind module actions click
$quickE.modActions.click(onModuleButtonClick);
//# sourceMappingURL=$quickE.module.js.map