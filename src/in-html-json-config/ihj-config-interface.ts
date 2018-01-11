import { Environment } from './environment';
import { User } from './user';
import { Language } from './language';
import { ContentBlock } from './content-block';
import { ContentGroup } from './content-group';
import { Error } from './error';

/**
 * IhjConfig interface
 */
export interface IIhjConfig {
  Environment: Environment;
  User: User;
  Language: Language;
  ContentBlock: ContentBlock;
  ContentGroup: ContentGroup;
  error: Error;
}
