"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_instanceCommands_1 = require("./commands.instanceCommands");
var create_1 = require("./create");
var link_to_ng_dialog_1 = require("./link-to-ng-dialog");
var open_ng_dialog_1 = require("./open-ng-dialog");
var command_execute_action_1 = require("./command-execute-action");
function instanceEngine(sxc, editContext) {
    var engine = {
        commands: commands_instanceCommands_1.initializeInstanceCommands(editContext),
        // assemble an object which will store the configuration and execute it
        create: function (specialSettings) {
            return create_1.create(sxc, editContext, specialSettings);
        },
        // create a dialog link
        _linkToNgDialog: function (specialSettings) {
            return link_to_ng_dialog_1.linkToNgDialog(sxc, editContext, specialSettings);
        },
        // open a new dialog of the angular-ui
        _openNgDialog: function (settings, event, sxc) {
            return open_ng_dialog_1.openNgDialog(settings, event, sxc, editContext);
        },
        executeAction: function (nameOrSettings, eventOrSettings, event) {
            return command_execute_action_1.commandExecuteAction(sxc, editContext, nameOrSettings, eventOrSettings, event);
        }
    };
    return engine;
}
exports.instanceEngine = instanceEngine;
;
//# sourceMappingURL=commands.engine.js.map