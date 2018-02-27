import { Definition } from '../../commands/definition';
import { ButtonConfig } from '../button/button-config';
import { GetButtonConfigDefaultsV1 } from '../button/expand-button-config';

export class CommandDefinition {
  name: string;
  buttonConfig: Partial<ButtonConfig>;
  //oldDefinition?: Definition;
}

