import { ButtonAction } from './action';
import { ButtonBaseConfig } from './base-config';

export class ButtonConfig extends ButtonBaseConfig {
  action: ButtonAction;
  name: string;
  params: any[];

  constructor(action?: ButtonAction, config?: ButtonBaseConfig) {
    super();

    if (action) {
      this.action = action;
    }

    if (config) this.setConfig(config);
  }

  static fromNameAndParams(name: string, params: any[], config?: ButtonConfig): ButtonConfig {
    const buttonConfig = new ButtonConfig();
    buttonConfig.name = name;
    buttonConfig.params = params;
    if (config) buttonConfig.setConfig(config);
    return buttonConfig;
  }

}
