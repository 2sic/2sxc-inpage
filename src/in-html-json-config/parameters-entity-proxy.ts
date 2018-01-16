import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull} from './ihj-helper';
import { ParametersEntity } from './parameters-entity';

/**
 * proxy create ParametersEntity object from JSON
 */
export class ParametersEntityProxy {
  public static Parse(data: string): ParametersEntity {
    return ParametersEntityProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): ParametersEntity {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    checkString(data.Key, false, field + ".Key");
    checkString(data.Value, false, field + ".Value");

    return new ParametersEntity(data);
  }
}