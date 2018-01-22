import DataEditContext from '../data-edit-context/data-edit-context';
import ContentGroup from '../data-edit-context/content-group';

export default function initializeInstanceCommands(editContext : DataEditContext) : any {
  let cg: ContentGroup = editContext.ContentGroup;
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
