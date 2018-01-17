import { JsonValidationHelper as ValidationHelper } from './json-validation-helper';
import { Error } from './error';

export class ErrorCreate {
  public static parse(data: string): Error {
    return ErrorCreate.create(JSON.parse(data));
  }

  public static create(data: any, field: string = 'root'): Error {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);
    ValidationHelper.checkString(data.type, true, field + '.type');

    // transfer JSON data to new object
    let error: Error = {
      type: data.type
    }

    return error;
  }
}