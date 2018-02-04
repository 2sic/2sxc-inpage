import { UserOfEditContext } from '../manage/user-of-edit-context';
import {Params } from './params';

export class Settings {
  partOfPage: boolean;
  prefill: any;
  cbId: number;
  cbIsEntity: boolean;
  contentGroupId: number;
  sortOrder: number;
  entityId: any;
  attributeSetName: string;
  contentType: string;
  params: Params;
  action: any;
  dialog: any;
  items: any; //string | string[];
  appId: number;
  isContent: boolean;
  hasContent: boolean;
  isList: boolean;
  templateId: number;
  contentTypeId: string;
  templateChooserVisible: boolean;
  user: UserOfEditContext;
  supportsAjax: boolean;
}