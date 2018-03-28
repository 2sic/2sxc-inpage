import { ContextOfButton } from '../context/context-of-button';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { getUserOfEditContext } from './api';
import { UserOfEditContext } from './user-of-edit-context';

export class QucikDialogConfig {
  appId: number;
  isContent: boolean;
  hasContent: boolean;
  isList: boolean;
  templateId: number;
  contentTypeId: string;
  templateChooserVisible: boolean;
  user: UserOfEditContext;
  supportsAjax: boolean;

  //constructor(editContext: DataEditContext) {
  //  this.appId = editContext.ContentGroup.AppId;
  //  this.isContent = editContext.ContentGroup.IsContent;
  //  this.hasContent = editContext.ContentGroup.HasContent;
  //  this.isList = editContext.ContentGroup.IsList;
  //  this.templateId = editContext.ContentGroup.TemplateId;
  //  this.contentTypeId = editContext.ContentGroup.ContentTypeName;
  //  this.templateChooserVisible = editContext.ContentBlock.ShowTemplatePicker; // todo = maybe move to content-group
  //  this.user = getUserOfEditContext(editContext);
  //  this.supportsAjax = editContext.ContentGroup.SupportsAjax;
  //}

  static fromContext(context: ContextOfButton): QucikDialogConfig {
    const config = new QucikDialogConfig();
    config.appId = context.app.id;
    config.isContent = context.app.isContent;
    config.hasContent = context.app.hasContent;
    config.isList = context.contentBlock.isList;
    config.templateId = context.contentBlock.templateId;
    config.contentTypeId = context.contentBlock.contentTypeId;
    config.templateChooserVisible = context.contentBlock.showTemplatePicker; // todo = maybe move to content-group
    config.user = UserOfEditContext.fromContext(context);
    config.supportsAjax = context.app.supportsAjax;
    return config;
  }
}
