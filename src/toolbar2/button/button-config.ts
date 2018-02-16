import { CommandDefinition } from '../command/command-definition';
import { ButtonAction } from './button-action';

export class ButtonConfig {
  classes?: string;
  icon: string = '';
  title: string = '';
  dynamicClasses: (() => string);
  show: boolean = true; // maybe
  showCondition: boolean | (() => boolean) = true;
  disabled: boolean | (() => boolean) = false;
  dynamicDisabled: (() => boolean) = () => false; // maybe

  name: string;
  params: any[];

  constructor(public action?: ButtonAction, partialConfig?: Partial<ButtonConfig>, commands?: CommandDefinition[]) {

    if (action) {
      this.action = action;
    }

    if (partialConfig) Object.assign(this, partialConfig);
  }

  static fromNameAndParams(name: string, params: any[], partialConfig?: Partial<ButtonConfig>, commands?: CommandDefinition[]): ButtonConfig {

    const buttonConfig = new ButtonConfig();
    buttonConfig.name = name;
    buttonConfig.params = params;

    // todo: look up command with this name

    // todo create an action for that command

    // todo: use the commands tmpButtonDefaults as the initial value

    // use the config? to override anything
    if (partialConfig) Object.assign(this, partialConfig);

    return buttonConfig;
  }

}
