import { ButtonConfig} from './button-config';

export class GroupConfig {
  buttons: ButtonConfig[]; // array of buttons

  constructor(buttons: ButtonConfig[]) {
    // adds these to the items
    this.buttons = buttons;
  }

  static fromNameAndParams(name: string, params?: any[]): GroupConfig {
    const groupConfig = new GroupConfig(new Array<ButtonConfig>());
    // builds buttons from name and params, then adds
    return groupConfig;
  }
}
