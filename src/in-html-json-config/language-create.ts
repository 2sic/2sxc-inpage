﻿import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { Language } from './language';

/**
 * create Language object from JSON
 */
export class LanguageCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): Language {
    return LanguageCreate.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): Language {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);
    ValidationHelper.checkString(data.Current, false, field + '.Current');
    ValidationHelper.checkString(data.Primary, false, field + '.Primary');
    ValidationHelper.checkArray(data.All, field + '.All');
    if (data.All) {
      for (let i = 0; i < data.All.length; i++) {
        ValidationHelper.checkNull(data.All[i], field + '.All' + '[' + i + ']');
        if (data.All[i] === undefined) {
          data.All[i] = null;
        }
      }
    }
    if (data.All === undefined) {
      data.All = null;
    }

    // transfer JSON data to new object
    let language: Language = {
      Current: data.Current,
      Primary: data.Primary,
      All: data.All
    }

    return language;
  }
}