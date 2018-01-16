import { IIhjConfig } from './ihj-config-interface';
import { Environment } from './environment';
import { User } from './user';
import { Language } from './language';
import { ContentBlock } from './content-block';
import { ContentGroup } from './content-group';
import { Error } from './error';

/**
 * IhjConfig class
 */
export class IhjConfig implements IIhjConfig {
  public Environment: Environment;
  public User: User;
  public Language: Language;
  public ContentBlock: ContentBlock;
  public ContentGroup: ContentGroup;
  public error: Error;

  constructor(data: any) {
    this.Environment = data.Environment;
    this.User = data.User;
    this.Language = data.Language;
    this.ContentBlock = data.ContentBlock;
    this.ContentGroup = data.ContentGroup;
    this.error = data.error;
  }
}














