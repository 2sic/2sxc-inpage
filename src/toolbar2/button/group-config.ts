import { ButtonConfig as ItemConfig } from './config';

export class GroupConfig {
  items: Item[];

  constructors(buttons: ItemConfig[]) {
    // adds these to the items
  }

  static fromNameAndParams(name: string, params?: any[]): GroupConfig {
    const groupConfig = new GroupConfig();
    // builds buttons from name and params, then adds
    return groupConfig;
  }
}
