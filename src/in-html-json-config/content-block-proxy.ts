import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull } from './ihj-helper';
import { ContentBlock } from './content-block';

/**
 * proxy create ContentBlock object from JSON
 */
export class ContentBlockProxy {
  public static Parse(data: string): ContentBlock {
    return ContentBlockProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): ContentBlock {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    checkBoolean(data.ShowTemplatePicker, false, field + ".ShowTemplatePicker");
    checkBoolean(data.IsEntity, false, field + ".IsEntity");
    checkString(data.VersioningRequirements, false, field + ".VersioningRequirements");
    checkNumber(data.Id, false, field + ".Id");
    checkString(data.ParentFieldName, true, field + ".ParentFieldName");
    if (data.ParentFieldName === undefined) {
      data.ParentFieldName = null;
    }
    checkNumber(data.ParentFieldSortOrder, false, field + ".ParentFieldSortOrder");
    checkBoolean(data.PartOfPage, false, field + ".PartOfPage");

    return new ContentBlock(data);
  }
}
