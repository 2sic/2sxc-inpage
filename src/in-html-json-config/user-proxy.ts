import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull } from './ihj-helper';
import { User } from './user';

/**
 * proxy create User object from JSON
 */
export class UserProxy {
  public static Parse(data: string): User {
    return UserProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): User {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    checkBoolean(data.CanDesign, false, field + ".CanDesign");
    checkBoolean(data.CanDevelop, false, field + ".CanDevelop");

    return new User(data);
  }
}