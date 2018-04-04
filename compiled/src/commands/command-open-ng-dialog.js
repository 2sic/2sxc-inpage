"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var render_1 = require("../contentBlock/render");
var quick_dialog_1 = require("../quick-dialog/quick-dialog");
var command_link_to_ng_dialog_1 = require("./command-link-to-ng-dialog");
/**
 * open a new dialog of the angular-ui
 * @param settings
 * @param event
 * @param sxc
 * @param editContext
 */
function commandOpenNgDialog(context, event) {
    // the callback will handle events after closing the dialog
    // and reload the in-page view w/ajax or page reload
    var callback = function () {
        render_1.reloadAndReInitialize(context);
        // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
    };
    var link = command_link_to_ng_dialog_1.commandLinkToNgDialog(context); // the link contains everything to open a full dialog (lots of params added)
    if (context.button.inlineWindow) {
        var fullScreen = false;
        if (!!context.button.fullScreen) {
            if (typeof (context.button.fullScreen) === 'function') {
                fullScreen = context.button.fullScreen(context);
            }
        }
        return quick_dialog_1.showOrToggle(context, link, callback, fullScreen, /* settings.dialog === "item-history"*/ context.button.dialog(context).toString());
    }
    var origEvent = event || window.event;
    if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
        return window.open(link);
    }
    return $2sxc.totalPopup.open(link, callback);
}
exports.commandOpenNgDialog = commandOpenNgDialog;
//# sourceMappingURL=command-open-ng-dialog.js.map