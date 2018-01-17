import { JsonValidationHelper as ValidationHelper } from './json-validation-helper';
import { User } from './user';

/**
 * create User object from JSON
 */
export class UserCreate {
  public static parse(data: string): User {
    return this.create(JSON.parse(data));
  }

  public static create(data: any, field: string = 'root'): User {
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