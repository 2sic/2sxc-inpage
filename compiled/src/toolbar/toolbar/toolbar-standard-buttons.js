"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toolbar_config_templates_1 = require("./toolbar-config-templates");
var log_1 = require("../../logging/log");
/**
 * the toolbar manager is an internal helper
 * taking care of toolbars, buttons etc.
 * @param canDesign
 * @param sharedParameters
 */
function toolbarStandardButtons(canDesign, sharedParameters, parentLog) {
    var log = new log_1.Log('Tlb.StdBtn', parentLog, "will retrieve standard buttons assuming design:" + canDesign + " - this should be factored away soon as not relevant any more");
    // create a deep-copy of the original object
    var toolbarTemplate = new toolbar_config_templates_1.ToolbarConfigTemplates(log).get('default'); // use default toolbar template
    var btns = $.extend(true, {}, toolbarTemplate);
    btns.params = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
    if (!canDesign) {
        // remove this menu
        btns.groups.splice(2, 1);
    }
    return btns;
}
exports.toolbarStandardButtons = toolbarStandardButtons;
//# sourceMappingURL=toolbar-standard-buttons.js.map