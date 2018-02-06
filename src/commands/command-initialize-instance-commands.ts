import { DataEditContext } from '../data-edit-context/data-edit-context';
import { create } from './commands.definitions';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { Action } from './action';

export function commandInitializeInstanceCommands(editContext : DataEditContext) : Action {
  let cg = editContext.ContentGroup;
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
