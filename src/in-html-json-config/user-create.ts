import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { User } from './user';

/**
 * create User object from JSON
 */
export class UserCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): User {
    return UserCreate.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): User {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);
    ValidationHelper.checkBoolean(data.CanDesign, false, field + '.CanDesign');
    ValidationHelper.checkBoolean(data.CanDevelop, false, field + '.CanDevelop');

    // transfer JSON data to new object
    let user: User = {
      CanDesign: data.CanDesign,
      CanDevelop: data.CanDevelop
    }

    return user;
  }
}