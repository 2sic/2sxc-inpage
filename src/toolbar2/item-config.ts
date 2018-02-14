import { ItemAction } from './item-action';
import { ItemBaseConfig } from './item-base-config';

export class ItemConfig extends ItemBaseConfig {
  action: ItemAction;
  name: string;
  params: any[];

  constructor(action?: ItemAction, config?: ItemBaseConfig) {
    super();

    if (action) {
      this.action = action;
    }

    if (config) this.SetConfig(config);
  }

  static fromNameAndParams(name: string, params: any[], config?: ItemConfig): ItemConfig {
    const itemConfig = new ItemConfig();
    itemConfig.name = name;
    itemConfig.params = params;
    if (config) itemConfig.SetConfig(config);
    return itemConfig;
  }

}
