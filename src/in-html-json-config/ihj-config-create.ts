import { IhjConfigValidationHelper as ValidationHelper } from './ihj-config-validation-helper';
import { IhjConfig } from './ihj-config';
import { EnvironmentCreate } from './environment-create';
import { UserCreate } from './user-create';
import { LanguageCreate as LanguageProxy } from './language-create';
import { ContentBlockCreate as ContentBlockProxy } from './content-block-create';
import { ContentGroupCreate } from './content-group-create';
import { ErrorCreate } from './error-create';

/**
 * create IhjConfig object from JSON
 *
 */
export class IhjConfigCreate {
  // ReSharper disable once InconsistentNaming
  public static Parse(data: string): IhjConfig {
    return IhjConfigCreate.Create(JSON.parse(data));
  }

  // ReSharper disable once InconsistentNaming
  public static Create(data: any, field: string = 'root'): IhjConfig {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);

    // create sub objects from JSON data
    data.Environment = EnvironmentCreate.Create(data.Environment, field + '.Environment');
    data.User = UserCreate.Create(data.User, field + '.User');
    data.Language = LanguageProxy.Create(data.Language, field + '.Language');
    data.ContentBlock = ContentBlockProxy.Create(data.ContentBlock, field + '.ContentBlock');
    data.ContentGroup = ContentGroupCreate.Create(data.ContentGroup, field + '.ContentGroup');
    data.error = ErrorCreate.Create(data.error, field + '.error');

    // transfer JSON data to new object
    let ihjConfig: IhjConfig = {
      Environment: data.Environment,
      User: data.User,
      Language: data.Language,
      ContentBlock: data.ContentBlock,
      ContentGroup: data.ContentGroup,
      error: data.error
    }

    return ihjConfig;
  }
}