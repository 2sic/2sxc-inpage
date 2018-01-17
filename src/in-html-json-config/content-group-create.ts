import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { ContentGroup } from './content-group';

/**
 * create ContentGroup object from JSON
 */
export class ContentGroupCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): ContentGroup {
    return ContentGroupCreate.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): ContentGroup {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);
    ValidationHelper.checkBoolean(data.IsCreated, false, field + '.IsCreated');
    ValidationHelper.checkBoolean(data.IsList, false, field + '.IsList');
    ValidationHelper.checkNumber(data.TemplateId, false, field + '.TemplateId');
    ValidationHelper.checkNumber(data.QueryId, true, field + '.QueryId');
    ValidationHelper.checkString(data.ContentTypeName, false, field + '.ContentTypeName');
    ValidationHelper.checkString(data.AppUrl, false, field + '.AppUrl');
    ValidationHelper.checkNumber(data.AppSettingsId, true, field + '.AppSettingsId');
    ValidationHelper.checkNumber(data.AppResourcesId, true, field + '.AppResourcesId');
    ValidationHelper.checkBoolean(data.IsContent, false, field + '.IsContent');
    ValidationHelper.checkBoolean(data.HasContent, false, field + '.HasContent');
    ValidationHelper.checkBoolean(data.SupportsAjax, false, field + '.SupportsAjax');
    ValidationHelper.checkNumber(data.ZoneId, false, field + '.ZoneId');
    ValidationHelper.checkNumber(data.AppId, false, field + '.AppId');
    ValidationHelper.checkString(data.Guid, false, field + '.Guid');
    ValidationHelper.checkNumber(data.Id, false, field + '.Id');

    // transfer JSON data to new object
    let contentGroup: ContentGroup = {
      IsCreated: data.IsCreated,
      IsList: data.IsList,
      TemplateId: data.TemplateId,
      QueryId: data.QueryId,
      ContentTypeName: data.ContentTypeName,
      AppUrl: data.AppUrl,
      AppSettingsId: data.AppSettingsId,
      AppResourcesId: data.AppResourcesId,
      IsContent: data.IsContent,
      HasContent: data.HasContent,
      SupportsAjax: data.SupportsAjax,
      ZoneId: data.ZoneId,
      AppId: data.AppId,
      Guid: data.Guid,
      Id: data.Id
    }

    return contentGroup;
  }
}