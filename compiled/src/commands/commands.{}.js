"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
var commands_definitions_1 = require("./commands.definitions");
var commands_engine_1 = require("./commands.engine");
var command_initialize_instance_commands_1 = require("./command-initialize-instance-commands");
//TEST
module_bootstrapper_1.$2sxc._commands = {
    definitions: {
        create: commands_definitions_1.create,
    },
    instanceEngine: commands_engine_1.instanceEngine,
    commandInitializeInstanceCommands: command_initialize_instance_commands_1.commandInitializeInstanceCommands
};
//# sourceMappingURL=commands.{}.js.map