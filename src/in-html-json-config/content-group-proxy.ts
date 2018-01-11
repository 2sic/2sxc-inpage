import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull } from './ihj-helper';
import { ContentGroup } from './content-group';

/**
 * proxy create ContentGroup object from JSON
 */
export class ContentGroupProxy {
  public static Parse(data: string): ContentGroup {
    return ContentGroupProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): ContentGroup {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    checkBoolean(data.IsCreated, false, field + ".IsCreated");
    checkBoolean(data.IsList, false, field + ".IsList");
    checkNumber(data.TemplateId, false, field + ".TemplateId");
    checkNumber(data.QueryId, false, field + ".QueryId");
    checkString(data.ContentTypeName, false, field + ".ContentTypeName");
    checkString(data.AppUrl, false, field + ".AppUrl");
    checkNumber(data.AppSettingsId, true, field + ".AppSettingsId");
    checkNumber(data.AppResourcesId, true, field + ".AppResourcesId");
    checkBoolean(data.IsContent, false, field + ".IsContent");
    checkBoolean(data.HasContent, false, field + ".HasContent");
    checkBoolean(data.SupportsAjax, false, field + ".SupportsAjax");
    checkNumber(data.ZoneId, false, field + ".ZoneId");
    checkNumber(data.AppId, false, field + ".AppId");
    checkString(data.Guid, false, field + ".Guid");
    checkNumber(data.Id, false, field + ".Id");

    return new ContentGroup(data);
  }
}