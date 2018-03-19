import { ButtonConfig } from '../button-config';
import { ButtonActionEnum } from './button-action-enum';
import { ButtonFactory } from './button-factory';

export class Button {
  buttonConfig: ButtonConfig;
  validationErrors: Error[];

  constructor(
    public actionName: ButtonActionEnum,
    public title?: string,
    public icon?: string,
    public classes?: string,
    public showCondition?: any,
    public dynamicClasses?: any
  ) {
    this.init();
    this.validate();
  }

  static newButton(
    actionEnum: ButtonActionEnum,
    title?: string,
    icon?: string,
    classes?: string,
    showCondition?: any,
    dynamicClasses?: any
  ): Button {
  return ButtonFactory.newButton(
    actionEnum,
    title,
    icon,
    classes,
    showCondition,
    dynamicClasses);
  }

  init() {
    // todo
    // set default values
  }

  validate() {
    // todo
    // validate all propreties
  }

}
