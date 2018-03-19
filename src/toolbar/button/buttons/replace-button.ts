import { ButtonActionEnum } from './button-action-enum';
import { Button } from './button';

export class ReplaceButton extends Button {

  constructor(
    title?: string,
    icon?: string,
    classes?: string,
    showCondition?: any,
    dynamicClasses?: any) {
    super(
      ButtonActionEnum.Replace,
      title,
      icon,
      classes,
      showCondition,
      dynamicClasses
    );
    this.init();
    this.validate();
  }

  init() {
    super.init();
    // todo
  }

  validate() {
    super.validate();
    // todo
  }

}