import { IContentBlock } from './content-block-interface';

/**
 * ContentBlock class
 */
export class ContentBlock implements IContentBlock {
  public ShowTemplatePicker: boolean;
  public IsEntity: boolean;
  public VersioningRequirements: string;
  public Id: number;
  public ParentFieldName: string;
  public ParentFieldSortOrder: number;
  public PartOfPage: boolean;
  
  constructor(data: any) {
    this.ShowTemplatePicker = data.ShowTemplatePicker;
    this.IsEntity = data.IsEntity;
    this.VersioningRequirements = data.VersioningRequirements;
    this.Id = data.Id;
    this.ParentFieldName = data.ParentFieldName;
    this.ParentFieldSortOrder = data.ParentFieldSortOrder;
    this.PartOfPage = data.PartOfPage;
  }
}