/**
 * ContentBlock interface
 */
export interface IContentBlock {
  ShowTemplatePicker: boolean;
  IsEntity: boolean;
  VersioningRequirements: string;
  Id: number;
  ParentFieldName: string;
  ParentFieldSortOrder: number;
  PartOfPage: boolean;
}