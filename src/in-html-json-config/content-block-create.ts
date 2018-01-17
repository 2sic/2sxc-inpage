import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { ContentBlock } from './content-block';

/**
 * create ContentBlock object from JSON
 */
export class ContentBlockCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): ContentBlock {
    return ContentBlockCreate.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): ContentBlock {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);
    ValidationHelper.checkBoolean(data.ShowTemplatePicker, false, field + '.ShowTemplatePicker');
    ValidationHelper.checkBoolean(data.IsEntity, false, field + '.IsEntity');
    ValidationHelper.checkString(data.VersioningRequirements, false, field + '.VersioningRequirements');
    ValidationHelper.checkNumber(data.Id, false, field + '.Id');
    ValidationHelper.checkString(data.ParentFieldName, true, field + '.ParentFieldName');
    if (data.ParentFieldName === undefined) {
      data.ParentFieldName = null;
    }
    ValidationHelper.checkNumber(data.ParentFieldSortOrder, false, field + '.ParentFieldSortOrder');
    ValidationHelper.checkBoolean(data.PartOfPage, false, field + '.PartOfPage');

    // transfer JSON data to new object
    let contenctBlock: ContentBlock = {
      ShowTemplatePicker: data.ShowTemplatePicker,
      IsEntity: data.IsEntity,
      VersioningRequirements: data.VersioningRequirements,
      Id: data.Id,
      ParentFieldName: data.ParentFieldName,
      ParentFieldSortOrder: data.ParentFieldSortOrder,
      PartOfPage: data.PartOfPage,
    };

    return contenctBlock;
  }
}
