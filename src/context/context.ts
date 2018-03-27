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
import { DataEditContext } from '../data-edit-context/data-edit-context';

/**
 * Primary API to get the context
 * @param htmlElement
 */
export function context(htmlElement: HTMLElement): ContextOfButton {
  const sxc = getSxcInstance(htmlElement);
  
  const editContext = getEditContext(sxc);
  const contextOfButton = getContextFromEditContext(editContext);

  contextOfButton.sxc.sxc = sxc; // stv: this is temp
  contextOfButton.element = htmlElement; // HTMLElement

  return contextOfButton;
}

export function getContextFromEditContext(editContext: DataEditContext) {
  const contextOfButton = new ContextOfButton();

  // *** ContextOf ***
  // this will be everything about the current system, like system / api -paths etc.
  contextOfButton.system = new SystemContext();
  if (editContext.error) {
    contextOfButton.system.error = editContext.error.type;
  }
  // empty

  // this will be something about the current tenant(the dnn portal)
  contextOfButton.tenant = new TenantContext();
  if (editContext.Environment) {
    contextOfButton.tenant.id = editContext.Environment.WebsiteId; // ex: InstanceConfig.portalId
    contextOfButton.tenant.url = editContext.Environment.WebsiteUrl;
  }

  // things about the user
  contextOfButton.user = new UserContext();
  if (editContext.User) {
    contextOfButton.user.canDesign = editContext.User.CanDesign;
    contextOfButton.user.canDevelop = editContext.User.CanDevelop;
  }

  // *** ContextOfPage ***
  // this will be information related to the current page
  contextOfButton.page = new PageContext();
  if (editContext.Environment) {
    contextOfButton.page.id = editContext.Environment.PageId; // ex: InstanceConfig.tabId
    contextOfButton.page.url = editContext.Environment.PageUrl;
  }

  // *** ContextOfInstance ***
  // this will be something about the sxc - object, version, etc.
  contextOfButton.sxc = new SxcContext();
  if (editContext.Environment) {
    contextOfButton.sxc.version = editContext.Environment.SxcVersion;
    contextOfButton.sxc.parameters = editContext.Environment.parameters;
    contextOfButton.sxc.sxcRootUrl = editContext.Environment.SxcRootUrl;
  }

  // temp
  contextOfButton.sxc.editContext = editContext; // stv: this is temp

  // information related to the current DNN module, incl.instanceId, etc.
  contextOfButton.instance = new InstanceContext();
  if (editContext.Environment) {
    contextOfButton.instance.id = editContext.Environment.InstanceId; // ex: InstanceConfig.moduleId
    contextOfButton.instance.isEditable = editContext.Environment.IsEditable;
  }
  if (editContext.ContentBlock) {
    contextOfButton.instance.allowPublish = editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed;
  }

  // this will be about the current app, settings of the app, app - paths, etc.
  contextOfButton.app = new AppContext();
  if (editContext.ContentGroup) {
    contextOfButton.app.id = editContext.ContentGroup.AppId;
    contextOfButton.app.isContent = editContext.ContentGroup.IsContent;
    contextOfButton.app.resourcesId = editContext.ContentGroup.AppResourcesId;
    contextOfButton.app.settingsId = editContext.ContentGroup.AppSettingsId;
    contextOfButton.app.appPath = editContext.ContentGroup.AppUrl; // ex: InstanceConfig.appPath
    contextOfButton.app.hasContent = editContext.ContentGroup.HasContent;
    contextOfButton.app.supportsAjax = editContext.ContentGroup.SupportsAjax;
    contextOfButton.app.zoneId = editContext.ContentGroup.ZoneId;
    contextOfButton.app.guid = editContext.ContentGroup.Guid; // todo: stv, it should not be 2 guid's #1/2
  }
  if (editContext.Language) {
    // languages
    contextOfButton.app.currentLanguage = editContext.Language.Current;
    contextOfButton.app.primaryLanguage = editContext.Language.Primary;
    contextOfButton.app.allLanguages = editContext.Language.All;
  }

  // *** ContextOfContentBlock ***
  // information related to the current contentBlock
  contextOfButton.contentBlock = new ContentBlockContext();
  if (editContext.ContentBlock) {
    contextOfButton.contentBlock.id = editContext.ContentBlock.Id; // ex: InstanceConfig.cbid
    contextOfButton.contentBlock.isEntity = editContext.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
    contextOfButton.contentBlock.showTemplatePicker = editContext.ContentBlock.ShowTemplatePicker;
    contextOfButton.contentBlock.versioningRequirements = editContext.ContentBlock.VersioningRequirements;
    contextOfButton.contentBlock.parentFieldName = editContext.ContentBlock.ParentFieldName;
    contextOfButton.contentBlock.parentFieldSortOrder = editContext.ContentBlock.ParentFieldSortOrder;
    contextOfButton.contentBlock.partOfPage = editContext.ContentBlock.PartOfPage;
  }
  if (editContext.ContentGroup) {
    contextOfButton.contentBlock.isCreated = editContext.ContentGroup.IsCreated;
    contextOfButton.contentBlock.isList = editContext.ContentGroup.IsList; // ex: InstanceConfig.isList
    contextOfButton.contentBlock.queryId = editContext.ContentGroup.QueryId;
    contextOfButton.contentBlock.templateId = editContext.ContentGroup.TemplateId;
    contextOfButton.contentBlock.contentTypeId = editContext.ContentGroup.ContentTypeName;
    contextOfButton.contentBlock.contentGroupId = editContext.ContentGroup.Guid; // // todo: stv, it should not be 2 guid's #1/2 ... ex: InstanceConfig.contentGroupId
  }

  // *** ContextOfItem ***
  // information about the current item
  contextOfButton.item = new ItemContext();
  // empty

  // *** ContextOfToolbar ***
  // fill externally

  // *** ContextOfButton ***
  // fill externally

  return contextOfButton;
}
