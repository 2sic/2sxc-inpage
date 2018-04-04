"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_1 = require("./command");
/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
function commandCreate(context) {
    var ngDialogUrl = context.instance.sxcRootUrl +
        'desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver=' +
        context.instance.sxcVersion;
    var isDebug = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';
    var cmd = new command_1.Command(context, ngDialogUrl, isDebug);
    return cmd;
}
exports.commandCreate = commandCreate;
//# sourceMappingURL=command-create.js.map