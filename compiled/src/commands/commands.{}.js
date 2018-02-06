"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
var create_1 = require("./create");
var engine_1 = require("./engine");
var command_initialize_instance_commands_1 = require("./command-initialize-instance-commands");
var Commands = /** @class */ (function () {
    function Commands() {
        this.definitions = {
            create: create_1.create
        };
        this.instanceEngine = engine_1.instanceEngine;
        this.initializeInstanceCommands = command_initialize_instance_commands_1.commandInitializeInstanceCommands;
    }
    return Commands;
}());
module_bootstrapper_1.$2sxc._commands = new Commands();
//# sourceMappingURL=commands.{}.js.map