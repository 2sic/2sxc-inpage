"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.
module_bootstrapper_1.$2sxc._toolbarManager.standardButtons = standardButtons;
//return;
function standardButtons(canDesign, sharedParameters) {
    // create a deep-copy of the original object
    var btns = $.extend(true, {}, module_bootstrapper_1.$2sxc._toolbarManager.toolbarTemplate);
    btns.params = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
    if (!canDesign)
        btns.groups.splice(2, 1); // remove this menu
    return btns;
}
//# sourceMappingURL=toolbarManager.standardButtons.js.map