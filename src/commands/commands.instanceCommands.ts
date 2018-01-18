import DataEditContext = require('../data-edit-context/data-edit-context');
import Contentgroup = require('../data-edit-context/content-group');

export function initializeInstanceCommands(editContext : DataEditContext.DataEditContext) : any {
  let cg: Contentgroup.ContentGroup = editContext.ContentGroup;
  return $2sxc._commands.definitions.create({
    canDesign: editContext.User.CanDesign,
    templateId: cg.TemplateId,
    contentTypeId: cg.ContentTypeName,
    isContent: cg.IsContent,
    queryId: cg.QueryId,
    appResourcesId: cg.AppResourcesId,
    appSettingsId: cg.AppSettingsId,
    allowPublish: editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed
  });
};
