import { ButtonConfig} from './button-config';

export class GroupConfig {
  items: ButtonConfig[]; // array of buttons

  constructors(buttons: ButtonConfig[]) {
    // adds these to the items
    this.items = buttons;
  }

  static fromNameAndParams(name: string, params?: any[]): GroupConfig {
    const groupConfig = new GroupConfig();
    // builds buttons from name and params, then adds
    return groupConfig;
  }
}
