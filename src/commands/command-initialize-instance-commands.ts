import { DataEditContext } from '../data-edit-context/data-edit-context';
import { Action } from './action';
import { create } from './action-create';

export function commandInitializeInstanceCommands(editContext: DataEditContext): Action {
  const cg = editContext.ContentGroup;
  return create({
    canDesign: editContext.User.CanDesign,
    templateId: cg.TemplateId,
    contentTypeId: cg.ContentTypeName,
    isContent: cg.IsContent,
    queryId: cg.QueryId,
    appResourcesId: cg.AppResourcesId,
    appSettingsId: cg.AppSettingsId,
    allowPublish: editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed,
  });
}
