export class ItemBaseConfig {
  classes: string;
  icon: string;
  title: string;
  dynamicClasses: (() => void);
  show: boolean; // maybe
  showCondition: boolean | (() => void);
  disabled: boolean | (() => void);
  dynamicDisabled: (() => void); // maybe

  constructor() {
    // have all values / properties null, this is to create a type-safe ButtonConfig which doesn't work, but has the correct property-names
    this.classes = null;
    this.icon = null;
    this.title = null;
    this.dynamicClasses = null;
    this.show = null;
    this.showCondition = null;
    this.disabled = null;
    this.dynamicDisabled = null;
  }

  setConfig(config: ItemBaseConfig) {
    this.classes = config.classes;
    this.icon = config.icon;
    this.title = config.title;
    this.dynamicClasses = config.dynamicClasses;
    this.show = config.show;
    this.showCondition = config.showCondition;
    this.disabled = config.disabled;
    this.dynamicDisabled = config.dynamicDisabled;
  }
}
