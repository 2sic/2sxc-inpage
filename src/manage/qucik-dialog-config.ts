﻿import { DataEditContext } from "../data-edit-context/data-edit-context";
import { UserOfEditContext } from "./user-of-edit-context";
import { getUserOfEditContext } from "./api";

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

  constructor(editContext: DataEditContext) {
    this.appId = editContext.ContentGroup.AppId;
    this.isContent = editContext.ContentGroup.IsContent;
    this.hasContent = editContext.ContentGroup.HasContent;
    this.isList = editContext.ContentGroup.IsList;
    this.templateId = editContext.ContentGroup.TemplateId;
    this.contentTypeId = editContext.ContentGroup.ContentTypeName;
    this.templateChooserVisible = editContext.ContentBlock.ShowTemplatePicker; // todo = maybe move to content-goup
    this.user = getUserOfEditContext(editContext);
    this.supportsAjax = editContext.ContentGroup.SupportsAjax
  }
}