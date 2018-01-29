"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
// prevent propagation of the click (if menu was clicked)
$(module_bootstrapper_1.$2sxc.c.sel.scMenu /*".sc-menu"*/).click(function (e) {
    e.stopPropagation();
});
//# sourceMappingURL=toolbar-events.js.map