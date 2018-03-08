import { getEditContext } from '../manage/api';
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
 * @param htmlElement
 */
export function context(htmlElement: HTMLElement): ContextOfButton {

  const sxc = getSxcInstance(htmlElement);
  const editContext = getEditContext(sxc);
  // console.log('stv: sxc, editContext', sxc, editContext);

  const contextOfButton = new ContextOfButton();

  // *** ContextOf ***
  // this will be everything about the current system, like system / api -paths etc.
  contextOfButton.system = new SystemContext();
  // empty

  // this will be something about the current tenant(the dnn portal)
  contextOfButton.tenant = new TenantContext();
  contextOfButton.tenant.id = editContext.Environment.WebsiteId; // ex: InstanceConfig.portalId

  // things about the user
  contextOfButton.user = new UserContext();
  contextOfButton.user.canDesign = editContext.User.CanDesign;

  // *** ContextOfPage ***
  // this will be information related to the current page
  contextOfButton.page = new PageContext();
  contextOfButton.page.id = editContext.Environment.PageId; // ex: InstanceConfig.tabId

  // *** ContextOfInstance ***
  // this will be something about the sxc - object, version, etc.
  contextOfButton.sxc = new SxcContext();
  contextOfButton.sxc.version = editContext.Environment.SxcVersion;
  contextOfButton.sxc.sxc = sxc; // stv: this is temp
  contextOfButton.sxc.editContext = editContext; // stv: this is temp

  // information related to the current DNN module, incl.instanceId, etc.
  contextOfButton.instance = new InstanceContext();
  contextOfButton.instance.id = editContext.Environment.InstanceId; // ex: InstanceConfig.moduleId
  contextOfButton.instance.allowPublish = editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed;

  // this will be about the current app, settings of the app, app - paths, etc.
  contextOfButton.app = new AppContext();
  contextOfButton.app.isContent = editContext.ContentGroup.IsContent;
  contextOfButton.app.resourcesId = editContext.ContentGroup.AppResourcesId;
  contextOfButton.app.settingsId = editContext.ContentGroup.AppSettingsId;
  contextOfButton.app.appPath = editContext.ContentGroup.AppUrl; // ex: InstanceConfig.appPath

  // *** ContextOfContentBlock ***
  // information related to the current contentBlock
  contextOfButton.contentBlock = new ContentBlockContext();
  contextOfButton.contentBlock.id = editContext.ContentBlock.Id; // ex: InstanceConfig.cbid
  contextOfButton.contentBlock.isEntity = editContext.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
  contextOfButton.contentBlock.isList = editContext.ContentGroup.IsList; // ex: InstanceConfig.isList
  contextOfButton.contentBlock.queryId = editContext.ContentGroup.QueryId;
  contextOfButton.contentBlock.templateId = editContext.ContentGroup.TemplateId;
  contextOfButton.contentBlock.contentTypeId = editContext.ContentGroup.ContentTypeName;
  contextOfButton.contentBlock.contentGroupId = editContext.ContentGroup.Guid; // ex: InstanceConfig.contentGroupId

  // *** ContextOfItem ***
  // information about the current item
  contextOfButton.item = new ItemContext();
  // empty

  // *** ContextOfToolbar ***
  // fill externally

  // *** ContextOfButton ***
  contextOfButton.element = htmlElement; // HTMLElement
  // contextOfButton.button = ButtonConfig; // todo: stv....

  // contextOfButton.cmdSpec = cmdSpec;
  // contextOfButton.enableTools = editContext.User.CanDesign;
  // contextOfButton.isContent = editContext.ContentGroup.IsContent;

  return contextOfButton;
}
