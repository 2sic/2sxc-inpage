import { Environment } from './environment';
import { User } from './user';
import { Language } from './language';
import { ContentBlock } from './content-block';
import { ContentGroup } from './content-group';
import { Error } from './error';

export class IhjConfig {
  // ReSharper disable InconsistentNaming
  public Environment: Environment;
  public User: User;
  public Language: Language;
  public ContentBlock: ContentBlock;
  public ContentGroup: ContentGroup;
  // ReSharper restore InconsistentNaming
  public error: Error;
}














