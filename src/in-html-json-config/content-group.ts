import { IContentGroup } from "./content-group-interface";

/**
 * ContentGroup class
 */
export class ContentGroup implements IContentGroup {
  public IsCreated: boolean;
  public IsList: boolean;
  public TemplateId: number;
  public QueryId: number;
  public ContentTypeName: string;
  public AppUrl: string;
  public AppSettingsId: number;
  public AppResourcesId: number;
  public IsContent: boolean;
  public HasContent: boolean;
  public SupportsAjax: boolean;
  public ZoneId: number;
  public AppId: number;
  public Guid: string;
  public Id: number;
 
  constructor(data: any) {
    this.IsCreated = data.IsCreated;
    this.IsList = data.IsList;
    this.TemplateId = data.TemplateId;
    this.QueryId = data.QueryId;
    this.ContentTypeName = data.ContentTypeName;
    this.AppUrl = data.AppUrl;
    this.AppSettingsId = data.AppSettingsId;
    this.AppResourcesId = data.AppResourcesId;
    this.IsContent = data.IsContent;
    this.HasContent = data.HasContent;
    this.SupportsAjax = data.SupportsAjax;
    this.ZoneId = data.ZoneId;
    this.AppId = data.AppId;
    this.Guid = data.Guid;
    this.Id = data.Id;
  }
}