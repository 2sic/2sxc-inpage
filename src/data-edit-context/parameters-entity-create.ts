import { JsonValidationHelper as ValidationHelper } from './json-validation-helper';
import { ParametersEntity } from './parameters-entity';

/**
 * create ParametersEntity object from JSON
 */
export class ParametersEntityCreate {
  public static parse(data: string): ParametersEntity {
    return this.create(JSON.parse(data));
  }

  public static create(data: any, field: string = 'root'): ParametersEntity {
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