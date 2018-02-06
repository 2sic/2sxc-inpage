"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var command_initialize_instance_commands_1 = require("./command-initialize-instance-commands");
var command_create_1 = require("./command-create");
var command_link_to_ng_dialog_1 = require("./command-link-to-ng-dialog");
var command_open_ng_dialog_1 = require("./command-open-ng-dialog");
var command_execute_action_1 = require("./command-execute-action");
var Engine2 = /** @class */ (function () {
    function Engine2(sxc, editContext) {
        var _this = this;
        this.sxc = sxc;
        this.editContext = editContext;
        this.commands = command_initialize_instance_commands_1.commandInitializeInstanceCommands(this.editContext);
        // assemble an object which will store the configuration and execute it
        this.create = function (specialSettings) {
            return command_create_1.commandCreate(_this.sxc, _this.editContext, specialSettings);
        };
        // create a dialog link
        this._linkToNgDialog = function (specialSettings) {
            return command_link_to_ng_dialog_1.commandLinkToNgDialog(_this.sxc, _this.editContext, specialSettings);
        };
        // open a new dialog of the angular-ui
        this._openNgDialog = function (settings, event, sxc) {
            return command_open_ng_dialog_1.commandOpenNgDialog(_this.sxc, _this.editContext, settings, event);
        };
        this.executeAction = function (nameOrSettings, eventOrSettings, event) {
            return command_execute_action_1.commandExecuteAction(_this.sxc, _this.editContext, nameOrSettings, eventOrSettings, event);
        };
    }
    return Engine2;
}());
exports.Engine2 = Engine2;
function instanceEngine(sxc, editContext) {
    return new Engine2(sxc, editContext);
}
exports.instanceEngine = instanceEngine;
;
//# sourceMappingURL=commands.engine.js.map