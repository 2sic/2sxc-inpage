"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_definitions_1 = require("./commands.definitions");
function initializeInstanceCommands(editContext) {
    var cg = editContext.ContentGroup;
    return commands_definitions_1.create({
        canDesign: editContext.User.CanDesign,
        templateId: cg.TemplateId,
        contentTypeId: cg.ContentTypeName,
        isContent: cg.IsContent,
        queryId: cg.QueryId,
        appResourcesId: cg.AppResourcesId,
        appSettingsId: cg.AppSettingsId,
        allowPublish: editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed
    });
}
exports.initializeInstanceCommands = initializeInstanceCommands;
;
//# sourceMappingURL=commands.instanceCommands.js.map