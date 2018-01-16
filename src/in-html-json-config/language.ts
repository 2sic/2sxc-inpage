import { checkArray, checkNumber, checkBoolean, checkString, checkNull, throwNull2NonNull, throwNotObject, throwIsArray, } from './ihj-helper';
import { ILanguage } from './language-interface';

/**
 * Language class
 */
export class Language implements ILanguage{
  public Current: string;
  public Primary: string;
  public All: string[] | null;

  constructor(data: any) {
    this.Current = data.Current;
    this.Primary = data.Primary;
    this.All = data.All;
  }
}