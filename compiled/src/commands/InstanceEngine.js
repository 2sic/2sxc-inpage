"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var api_1 = require("../manage/api");
var command_create_1 = require("./command-create");
var command_execute_action_1 = require("./command-execute-action");
var commands_1 = require("./commands");
var InstanceEngine = /** @class */ (function () {
    function InstanceEngine(sxc) {
        this.sxc = sxc;
        this.commands = commands_1.Commands.getInstance;
        // todo: stv, check this specialSettings
        // assemble an object which will store the configuration and execute it
        this.create = function (context, specialSettings) {
            return command_create_1.commandCreate(context);
        };
    }
    InstanceEngine.prototype.run = function (nameOrSettings, eventOrSettings, event) {
        var tag = api_1.getTag(this.sxc);
        this.context = context_1.context(tag);
        return new command_execute_action_1.Engine(null).detectParamsAndRun(this.context, nameOrSettings, eventOrSettings, event);
    };
    return InstanceEngine;
}());
exports.InstanceEngine = InstanceEngine;
function instanceEngine(sxc) {
    return new InstanceEngine(sxc);
}
exports.instanceEngine = instanceEngine;
//# sourceMappingURL=InstanceEngine.js.map