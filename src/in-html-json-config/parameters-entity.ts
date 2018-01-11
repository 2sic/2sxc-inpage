import { checkArray, checkNumber, checkBoolean, checkString, checkNull, throwNull2NonNull, throwNotObject, throwIsArray, } from './ihj-helper';
import { IParametersEntity} from './parameters-entity-interface';

/**
 * ParametersEntity class
 */
export class ParametersEntity implements IParametersEntity {
  public Key: string;
  public Value: string;

  constructor(data: any) {
    this.Key = data.Key;
    this.Value = data.Value;
  }
}