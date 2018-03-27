﻿import { getEditContext } from '../manage/api';
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

var contextCache: any = {};
/**
 * Primary API to get the context (context is cached)
 * @param htmlElement or Id (moduleId)
 * @param cbid
 */
export function context(htmlElementOrId: HTMLElement | number, cbid?: number): ContextOfButton {
  const sxc = getSxcInstance(htmlElementOrId);
  const contextOfButton = getContextInstance(sxc, cbid);
  return contextOfButton;
}

/**
 * Create copy of context, so it can be modified before use  (contextCopy is cached)
 * @param htmlElement or Id (moduleId)
 * @param cbid
 */
export function contextCopy(htmlElementOrId: HTMLElement | number, cbid?: number): ContextOfButton {
  const sxc = getSxcInstance(htmlElementOrId);
  const contextOfButton = getContextInstance(sxc, cbid);
  // make a copy
  const copyOfContext = JSON.parse(JSON.stringify(contextOfButton)); 
  return copyOfContext;
}

/**
 * Return existing context from cache or create new one
 * @param sxc
 * @param cbid
 */
export function getContextInstance(sxc: SxcInstanceWithInternals, cbid?: number): ContextOfButton {
  // get from cache for reuse
  const cacheKey = sxc.id + ':' + cbid;
  if (!contextCache[cacheKey]) {
    // create new context if not in cache
    const editContext = getEditContext(sxc);
    contextCache[cacheKey] = createContextFromEditContext(editContext);
    // contextOfButton.sxc.sxc = sxc; // stv: this is temp
    //if (typeof htmlElementOrId !== 'number') {
    //  contextOfButton.element = htmlElementOrId as HTMLElement; // HTMLElement
    //}
  }
  return contextCache[cacheKey];
}

/**
 * create part of context object (it is not cached)
 * @param editContext
 */
export function createContextFromEditContext(editContext: DataEditContext) {
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
    contextOfButton.tenant.id = editContext.Environment.WebsiteId; // InstanceConfig.portalId
    contextOfButton.tenant.url = editContext.Environment.WebsiteUrl; // NgDialogParams.portalroot
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
    contextOfButton.page.id = editContext.Environment.PageId; // InstanceConfig.tabId, NgDialogParams.tid
    contextOfButton.page.url = editContext.Environment.PageUrl;
  }

  // *** ContextOfInstance ***
  // this will be something about the sxc - object, version, etc.
  contextOfButton.sxc = new SxcContext();
  if (editContext.Environment) {
    contextOfButton.sxc.version = editContext.Environment.SxcVersion;
    contextOfButton.sxc.parameters = editContext.Environment.parameters;
    contextOfButton.sxc.sxcRootUrl = editContext.Environment.SxcRootUrl;// NgDialogParams.websiteroot
  }

  // temp
  contextOfButton.sxc.editContext = editContext; // stv: this is temp

  // information related to the current DNN module, incl.instanceId, etc.
  contextOfButton.instance = new InstanceContext();
  if (editContext.Environment) {
    contextOfButton.instance.id = editContext.Environment.InstanceId; // InstanceConfig.moduleId, NgDialogParams.mid
    contextOfButton.instance.isEditable = editContext.Environment.IsEditable;
  }
  if (editContext.ContentBlock) {
    contextOfButton.instance.allowPublish = editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed;// NgDialogParams.publishing
  }

  // this will be about the current app, settings of the app, app - paths, etc.
  contextOfButton.app = new AppContext();
  if (editContext.ContentGroup) {
    contextOfButton.app.id = editContext.ContentGroup.AppId; // or NgDialogParams.appId
    contextOfButton.app.isContent = editContext.ContentGroup.IsContent;
    contextOfButton.app.resourcesId = editContext.ContentGroup.AppResourcesId;
    contextOfButton.app.settingsId = editContext.ContentGroup.AppSettingsId;
    contextOfButton.app.appPath = editContext.ContentGroup.AppUrl; // InstanceConfig.appPath, NgDialogParams.approot, this is the only value which doesn't have a slash by default. note that the app-root doesn't exist when opening "manage-app"
    contextOfButton.app.hasContent = editContext.ContentGroup.HasContent;
    contextOfButton.app.supportsAjax = editContext.ContentGroup.SupportsAjax;
    contextOfButton.app.zoneId = editContext.ContentGroup.ZoneId; // or NgDialogParams.zoneId
  }
  if (editContext.Language) {
    // languages
    contextOfButton.app.currentLanguage = editContext.Language.Current;  // NgDialogParams.lang
    contextOfButton.app.primaryLanguage = editContext.Language.Primary; // NgDialogParams.langpri
    contextOfButton.app.allLanguages = editContext.Language.All; // or NgDialogParams.langs
  }

  // *** ContextOfContentBlock ***
  // information related to the current contentBlock
  contextOfButton.contentBlock = new ContentBlockContext();
  if (editContext.ContentBlock) {
    contextOfButton.contentBlock.id = editContext.ContentBlock.Id; // or sxc.cbid or InstanceConfig.cbid
    contextOfButton.contentBlock.isEntity = editContext.ContentBlock.IsEntity; // ex: InstanceConfig.cbIsEntity
    contextOfButton.contentBlock.showTemplatePicker = editContext.ContentBlock.ShowTemplatePicker;
    contextOfButton.contentBlock.versioningRequirements = editContext.ContentBlock.VersioningRequirements;
    contextOfButton.contentBlock.parentFieldName = editContext.ContentBlock.ParentFieldName;
    contextOfButton.contentBlock.parentFieldSortOrder = editContext.ContentBlock.ParentFieldSortOrder;
    contextOfButton.contentBlock.partOfPage = editContext.ContentBlock.PartOfPage;// NgDialogParams.partOfPage
  }
  if (editContext.ContentGroup) {
    contextOfButton.contentBlock.isCreated = editContext.ContentGroup.IsCreated;
    contextOfButton.contentBlock.isList = editContext.ContentGroup.IsList; // ex: InstanceConfig.isList
    contextOfButton.contentBlock.queryId = editContext.ContentGroup.QueryId;
    contextOfButton.contentBlock.templateId = editContext.ContentGroup.TemplateId;
    contextOfButton.contentBlock.contentTypeId = editContext.ContentGroup.ContentTypeName;
    contextOfButton.contentBlock.contentGroupId = editContext.ContentGroup.Guid; // ex: InstanceConfig.contentGroupId
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

