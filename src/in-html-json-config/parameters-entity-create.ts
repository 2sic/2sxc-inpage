import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { ParametersEntity } from './parameters-entity';

/**
 * create ParametersEntity object from JSON
 */
export class ParametersEntityCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): ParametersEntity {
    return this.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): ParametersEntity {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);
    ValidationHelper.checkString(data.Key, false, field + '.Key');
    ValidationHelper.checkString(data.Value, false, field + '.Value');

    // transfer JSON data to new object
    let parametersEntity: ParametersEntity = {
      Key: data.Key,
      Value: data.Value
    }

    return parametersEntity;
  }
}