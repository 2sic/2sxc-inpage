import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { ParametersEntityCreate } from './parameters-entity-create';
import { Environment } from './environment';

/**
 * create Environment object from JSON
 */
export class EnvironmentCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): Environment {
    return EnvironmentCreate.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): Environment {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);
    ValidationHelper.checkNumber(data.WebsiteId, false, field + '.WebsiteId');
    ValidationHelper.checkString(data.WebsiteUrl, false, field + '.WebsiteUrl');
    ValidationHelper.checkNumber(data.PageId, false, field + '.PageId');
    ValidationHelper.checkString(data.PageUrl, false, field + '.PageUrl');
    ValidationHelper.checkArray(data.parameters, field + '.parameters');
    if (data.parameters) {
      for (let i = 0; i < data.parameters.length; i++) {
        data.parameters[i] = ParametersEntityCreate.Create(data.parameters[i], field + '.parameters' + '[' + i + ']');
      }
    }
    if (data.parameters === undefined) {
      data.parameters = null;
    }
    ValidationHelper.checkNumber(data.InstanceId, false, field + '.InstanceId');
    ValidationHelper.checkString(data.SxcVersion, false, field + '.SxcVersion');
    ValidationHelper.checkString(data.SxcRootUrl, false, field + '.SxcRootUrl');
    ValidationHelper.checkBoolean(data.IsEditable, false, field + '.IsEditable');

    // transfer JSON data to new object
    let environment: Environment = {
      WebsiteId: data.WebsiteId,
      WebsiteUrl: data.WebsiteUrl,
      PageId: data.PageId,
      PageUrl: data.PageUrl,
      parameters: data.parameters,
      InstanceId: data.InstanceId,
      SxcVersion: data.SxcVersion,
      SxcRootUrl: data.SxcRootUrl,
      IsEditable: data.IsEditable,
    }

    return environment;
  }
}
