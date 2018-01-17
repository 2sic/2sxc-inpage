import { JsonValidationHelper as ValidationHelper } from './json-validation-helper';
import { DataEditContext } from './data-edit-context';
import { EnvironmentCreate } from './environment-create';
import { UserCreate } from './user-create';
import { LanguageCreate as LanguageProxy } from './language-create';
import { ContentBlockCreate as ContentBlockProxy } from './content-block-create';
import { ContentGroupCreate } from './content-group-create';
import { ErrorCreate } from './error-create';

/**
 * create DataEditContext object from JSON
 *
 */
export class DataEditContextCreate {
  public static parse(data: string): DataEditContext {
    return this.create(JSON.parse(data));
  }

  public static create(data: any, field: string = 'root'): DataEditContext {
    if (!field) {
      field = 'root';
    }

    // validate JSON data
    ValidationHelper.checkData(data, field);

    // create sub objects from JSON data
    data.Environment = EnvironmentCreate.create(data.Environment, field + '.Environment');
    data.User = UserCreate.create(data.User, field + '.User');
    data.Language = LanguageProxy.create(data.Language, field + '.Language');
    data.ContentBlock = ContentBlockProxy.Create(data.ContentBlock, field + '.ContentBlock');
    data.ContentGroup = ContentGroupCreate.create(data.ContentGroup, field + '.ContentGroup');
    data.error = ErrorCreate.create(data.error, field + '.error');

    // transfer JSON data to new object
    let dataEditContext: DataEditContext = {
      Environment: data.Environment,
      User: data.User,
      Language: data.Language,
      ContentBlock: data.ContentBlock,
      ContentGroup: data.ContentGroup,
      error: data.error
    }

    return dataEditContext;
  }
}