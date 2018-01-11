import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull } from './ihj-helper';
import { Language } from './language';

/**
 * proxy create Language object from JSON
 */
export class LanguageProxy {
  public static Parse(data: string): Language {
    return LanguageProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): Language {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    checkString(data.Current, false, field + ".Current");
    checkString(data.Primary, false, field + ".Primary");
    checkArray(data.All, field + ".All");
    if (data.All) {
      for (let i = 0; i < data.All.length; i++) {
        checkNull(data.All[i], field + ".All" + "[" + i + "]");
        if (data.All[i] === undefined) {
          data.All[i] = null;
        }
      }
    }
    if (data.All === undefined) {
      data.All = null;
    }

    return new Language(data);
  }
}