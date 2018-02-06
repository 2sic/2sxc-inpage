"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_definitions_1 = require("./commands.definitions");
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
function commandInitializeInstanceCommands(editContext) {
    var cg = editContext.ContentGroup;
    return commands_definitions_1.create({
        canDesign: editContext.User.CanDesign,
        templateId: cg.TemplateId,
        contentTypeId: cg.ContentTypeName,
        isContent: cg.IsContent,
        queryId: cg.QueryId,
        appResourcesId: cg.AppResourcesId,
        appSettingsId: cg.AppSettingsId,
        allowPublish: editContext.ContentBlock.VersioningRequirements === module_bootstrapper_1.$2sxc.c.publishAllowed
    });
}
exports.commandInitializeInstanceCommands = commandInitializeInstanceCommands;
;
//# sourceMappingURL=commands.instanceCommands.js.map