/**
 * ContentGroup interface
 */
export interface IContentGroup {
  IsCreated: boolean;
  IsList: boolean;
  TemplateId: number;
  QueryId: number | null;
  ContentTypeName: string;
  AppUrl: string;
  AppSettingsId: number;
  AppResourcesId: number;
  IsContent: boolean;
  HasContent: boolean;
  SupportsAjax: boolean;
  ZoneId: number;
  AppId: number;
  Guid: string;
  Id: number;
}