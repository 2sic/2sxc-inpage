import { CmdSpec } from '../commands/cmd-spec';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { getEditContext } from '../manage/api';
import { ToolbarConfig } from '../toolbar2/toolbar/toolbar-config';
import { getSxcInstance } from '../x-bootstrap/sxc';
import { SystemContext } from './base-context/system-context';
import { TenantContext } from './base-context/tenant-context';
import { UserContext } from './base-context/user-context';
import { ContentBlockContext } from './content-block-context/content-block-context';
import { ContextOfButton } from './context-of-button';
import { AppContext } from './instance-context/app-context';
import { InstanceContext } from './instance-context/instance-context';
import { SxcContext } from './instance-context/sxc-context';
import { ItemContext } from './item-context/item-context';
import { PageContext } from './page-context/page-context';

/**
 * Primary API to get the context
 * @param context
 */
export function context(context: HTMLElement): ContextOfButton {

  const sxc: SxcInstanceWithInternals = getSxcInstance(context);
  const editContext: DataEditContext = getEditContext(sxc);
  // console.log('stv: sxc, editContext', sxc, editContext);

  const contextOfButton = new ContextOfButton();

  // *** ContextOf ***
  // this will be everything about the current system, like system / api -paths etc.
  contextOfButton.system = new SystemContext();
  // this will be something about the current tenant(the dnn portal)
  contextOfButton.tenant = new TenantContext();
  // things about the user
  contextOfButton.user = new UserContext();
  contextOfButton.user.canDesign = editContext.User.CanDesign;

  // *** ContextOfPage ***
  // this will be information related to the current page
  contextOfButton.page = new PageContext();

  // *** ContextOfInstance ***
  // this will be something about the sxc - object, version, etc.
  contextOfButton.twosxc = new SxcContext();
  // information related to the current DNN module, incl.instanceId, etc.
  contextOfButton.instance = new InstanceContext();
  contextOfButton.instance.allowPublish = editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed,
  // this will be about the current app, settings of the app, app - paths, etc.
  contextOfButton.app = new AppContext();
  contextOfButton.app.isContent = editContext.ContentGroup.IsContent;
  contextOfButton.app.resourcesId = editContext.ContentGroup.AppResourcesId;
  contextOfButton.app.settingsId = editContext.ContentGroup.AppSettingsId;

  // *** ContextOfContentBlock ***
  // information related to the current contentBlock
  contextOfButton.contentBlock = new ContentBlockContext();
  contextOfButton.contentBlock.queryId = editContext.ContentGroup.QueryId;
  contextOfButton.contentBlock.templateId = editContext.ContentGroup.TemplateId;
  contextOfButton.contentBlock.contentTypeId = editContext.ContentGroup.ContentTypeName;

  // *** ContextOfItem ***
  // information about the current item
  contextOfButton.item = new ItemContext();


  // *** ContextOfToolbar ***
  contextOfButton.toolbar = new ToolbarConfig();

  // *** ContextOfButton ***

  contextOfButton.sxc = sxc;
  contextOfButton.editContext = editContext;

  // contextOfButton.button = ButtonConfig; // tood: stv....
  // contextOfButton.cmdSpec = cmdSpec;
  // contextOfButton.enableTools = editContext.User.CanDesign;
  // contextOfButton.isContent = editContext.ContentGroup.IsContent;

  //console.log('stv: context', context);
  //return cob;

  return contextOfButton;
}
