import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull } from './ihj-helper';
import { ParametersEntityProxy } from './parameters-entity-proxy';
import { Environment } from './environment';

/**
 * proxy create Environment object from JSON
 */
export class EnvironmentProxy {
  public static Parse(data: string): Environment {
    return EnvironmentProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): Environment {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    checkNumber(data.WebsiteId, false, field + ".WebsiteId");
    checkString(data.WebsiteUrl, false, field + ".WebsiteUrl");
    checkNumber(data.PageId, false, field + ".PageId");
    checkString(data.PageUrl, false, field + ".PageUrl");
    checkArray(data.parameters, field + ".parameters");
    if (data.parameters) {
      for (let i = 0; i < data.parameters.length; i++) {
        data.parameters[i] = ParametersEntityProxy.Create(data.parameters[i], field + ".parameters" + "[" + i + "]");
      }
    }
    if (data.parameters === undefined) {
      data.parameters = null;
    }
    checkNumber(data.InstanceId, false, field + ".InstanceId");
    checkString(data.SxcVersion, false, field + ".SxcVersion");
    checkString(data.SxcRootUrl, false, field + ".SxcRootUrl");
    checkBoolean(data.IsEditable, false, field + ".IsEditable");

    return new Environment(data);
  }
}