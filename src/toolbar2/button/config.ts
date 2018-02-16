import { ButtonAction } from './action';
import { ButtonBaseConfig } from './base-config';
import { CommandDefinition } from '../command/definition';

export class ButtonConfig extends ButtonBaseConfig {
  //action: ButtonAction;
  name: string;
  params: any[];

  constructor(public action?: ButtonAction, config?: ButtonBaseConfig) {
    super();

    if (action) {
      this.action = action;
    }

    if (config) this.setConfig(config);
  }

  static fromNameAndParams(name: string, params: any[], config?: ButtonBaseConfig, commands?: CommandDefinition[]): ButtonConfig {

    //todo: look up command with this name

    // todo create an action for that command

    //todo: use the commands tmpButtonDefaults as the initial value
    // then use the config? to override anything
    const buttonConfig = new ButtonConfig();
    buttonConfig.name = name;
    buttonConfig.params = params;
    if (config) buttonConfig.setConfig(config);
    return buttonConfig;
  }

}
