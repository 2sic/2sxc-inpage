import { checkArray, checkNumber, checkBoolean, checkString, checkNull, throwNull2NonNull, throwNotObject, throwIsArray, } from './ihj-helper';
import { IUser } from './user-interface';

/**
 * User class
 */
export class User implements IUser {
  public CanDesign: boolean;
  public CanDevelop: boolean;
  
  constructor(data: any) {
    this.CanDesign = data.CanDesign;
    this.CanDevelop = data.CanDevelop;
  }
}