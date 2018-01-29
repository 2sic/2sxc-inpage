import { Environment } from './environment';
import { User } from './user';
import { Language } from './language';
import { ContentBlock } from './content-block';
import { ContentGroup } from './content-group';
import { Error } from './error';

export class DataEditContext {
  // ReSharper disable InconsistentNaming
  Environment: Environment;
  User: User;
  Language: Language;
  ContentBlock: ContentBlock;
  ContentGroup: ContentGroup;
  // ReSharper restore InconsistentNaming
  error: Error;
}
