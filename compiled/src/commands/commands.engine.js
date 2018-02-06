"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_initialize_instance_commands_1 = require("./command-initialize-instance-commands");
var command_create_1 = require("./command-create");
var command_link_to_ng_dialog_1 = require("./command-link-to-ng-dialog");
var command_open_ng_dialog_1 = require("./command-open-ng-dialog");
var command_execute_action_1 = require("./command-execute-action");
function instanceEngine(sxc, editContext) {
    var engine = {
        commands: command_initialize_instance_commands_1.commandInitializeInstanceCommands(editContext),
        // assemble an object which will store the configuration and execute it
        create: function (specialSettings) {
            return command_create_1.commandCreate(sxc, editContext, specialSettings);
        },
        // create a dialog link
        _linkToNgDialog: function (specialSettings) {
            return command_link_to_ng_dialog_1.commandLinkToNgDialog(sxc, editContext, specialSettings);
        },
        // open a new dialog of the angular-ui
        _openNgDialog: function (settings, event, sxc) {
            return command_open_ng_dialog_1.commandOpenNgDialog(sxc, editContext, settings, event);
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