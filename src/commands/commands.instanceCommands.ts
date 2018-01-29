import DataEditContext from '../data-edit-context/data-edit-context';
import ContentGroup from '../data-edit-context/content-group';
import { create } from './commands.definitions';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

export function initializeInstanceCommands(editContext : DataEditContext) : any {
  let cg: ContentGroup = editContext.ContentGroup;
  return create({
    canDesign: editContext.User.CanDesign,
    templateId: cg.TemplateId,
    contentTypeId: cg.ContentTypeName,
    isContent: cg.IsContent,
    queryId: cg.QueryId,
    appResourcesId: cg.AppResourcesId,
    appSettingsId: cg.AppSettingsId,
    allowPublish: editContext.ContentBlock.VersioningRequirements === twoSxc.c.publishAllowed
  });
};
