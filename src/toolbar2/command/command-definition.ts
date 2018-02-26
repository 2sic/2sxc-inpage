import { Definition } from '../../commands/definition';
import { ButtonConfig } from '../button/button-config';

export class CommandDefinition {
  name: string;
  buttonConfig: ButtonConfig;
  oldDefinition?: Definition;
}

