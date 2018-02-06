"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
var commands_definitions_1 = require("./commands.definitions");
var engine_1 = require("./engine");
var command_initialize_instance_commands_1 = require("./command-initialize-instance-commands");
//TEST
module_bootstrapper_1.$2sxc._commands = {
    definitions: {
        create: commands_definitions_1.create,
    },
    instanceEngine: engine_1.instanceEngine,
    commandInitializeInstanceCommands: command_initialize_instance_commands_1.commandInitializeInstanceCommands
};
//# sourceMappingURL=commands.{}.js.map