import { checkData, checkArray, checkNumber, checkBoolean, checkString, checkNull } from './ihj-helper';
import { IhjConfig } from './ihj-config';
import { EnvironmentProxy } from './environment-proxy';
import { UserProxy } from './user-proxy';
import { LanguageProxy } from './language-proxy';
import { ContentBlockProxy } from './content-block-proxy';
import { ContentGroupProxy } from './content-group-proxy';
import { ErrorProxy } from './error-proxy';

/**
 * proxy create IhjConfig object from JSON
 *
 */
export class IhjConfigProxy {
  public static Parse(data: string): IhjConfig {
    return IhjConfigProxy.Create(JSON.parse(data));
  }

  public static Create(data: any, field: string = 'root'): IhjConfig {
    if (!field) {
      field = "root";
    }

    checkData(data, field);

    data.Environment = EnvironmentProxy.Create(data.Environment, field + ".Environment");
    data.User = UserProxy.Create(data.User, field + ".User");
    data.Language = LanguageProxy.Create(data.Language, field + ".Language");
    data.ContentBlock = ContentBlockProxy.Create(data.ContentBlock, field + ".ContentBlock");
    data.ContentGroup = ContentGroupProxy.Create(data.ContentGroup, field + ".ContentGroup");
    data.error = ErrorProxy.Create(data.error, field + ".error");

    return new IhjConfig(data);
  }
}