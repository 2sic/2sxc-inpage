import { CmdSpec } from '../commands/cmd-spec';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { getEditContext } from '../manage/api';
//import { Commands } from '../toolbar2/command/commands';
//import { renderToolbar } from '../toolbar2/item/render-toolbar';
//import { ToolbarConfig } from '../toolbar2/toolbar/toolbar-config';
//import { ExpandToolbarConfig } from '../toolbar2/toolbar/toolbar-expand-config';
//import { settingsForEmptyToolbar, ToolbarSettings } from '../toolbar2/toolbar/toolbar-settings';
import { getSxcInstance } from '../x-bootstrap/sxc';
import { ContextOfButton } from './context-of-button';



/**
 * Primary API to get the context
 * @param context
 */
export function context(context: HTMLElement): ContextOfButton {

  const sxc: SxcInstanceWithInternals = getSxcInstance(context);
  const editContext: DataEditContext = getEditContext(sxc);
  // console.log('stv: sxc, editContext', sxc, editContext);

  const cmdSpec: CmdSpec = {
    canDesign: editContext.User.CanDesign,
    templateId: editContext.ContentGroup.TemplateId,
    contentTypeId: editContext.ContentGroup.ContentTypeName,
    isContent: editContext.ContentGroup.IsContent,
    queryId: editContext.ContentGroup.QueryId,
    appResourcesId: editContext.ContentGroup.AppResourcesId,
    appSettingsId: editContext.ContentGroup.AppSettingsId,
    allowPublish: editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed,
  } as CmdSpec;

  const contextOfButton = new ContextOfButton();
  contextOfButton.sxc = sxc;
  contextOfButton.editContext = editContext;
  // contextOfButton.button = ButtonConfig; // tood: stv....
  contextOfButton.cmdSpec = cmdSpec;
  contextOfButton.enableTools = cmdSpec.canDesign;
  contextOfButton.isContent = cmdSpec.isContent;

  //console.log('stv: context', context);
  //return cob;

  return contextOfButton;
}


