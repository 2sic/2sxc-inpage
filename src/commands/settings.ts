﻿import { UserOfEditContext } from '../manage/user-of-edit-context';
import {Params } from './params';

export class Settings {
  newWindow: any;
  fullScreen: any;
  inlineWindow: any;
  action: any;
  appId: number;
  attributeSetName: string;
  cbId: number;
  cbIsEntity: boolean;
  configureCommand: any;
  contentGroupId: number;
  contentType: string;
  contentTypeId: string;
  customCode: any;
  dialog: any;
  entityGuid: string;
  entityId: number;
  entityTitle: string;
  filters: string;
  hasContent: boolean;
  isContent: boolean;
  isList: boolean;
  isPublished: boolean;
  items: any; //string | string[];
  metadata: any;
  params: Params;
  partOfPage: boolean;
  prefill: any;
  sortOrder: number;
  supportsAjax: boolean;
  templateChooserVisible: boolean;
  templateId: number;
  useModuleList: boolean;
  user: UserOfEditContext;
}