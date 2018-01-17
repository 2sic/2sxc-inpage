import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { Error } from './error';

export class ErrorCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): Error {
    return ErrorCreate.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): Error {
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