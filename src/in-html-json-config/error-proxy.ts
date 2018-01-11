import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull } from './ihj-helper';
import { Error } from './error';

export class ErrorProxy {
  public static Parse(data: string): Error {
    return ErrorProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): Error {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    checkString(data.type, true, field + ".type");

    return new Error(data);
  }
}