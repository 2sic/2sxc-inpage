import { ButtonActionEnum } from './button-action-enum';
import { Button } from './button';

export class MoveUpButton extends Button {
  constructor(
    title?: string,
    icon?: string,
    classes?: string,
    showCondition?: any,
    dynamicClasses?: any) {
    super(
      ButtonActionEnum.MoveUp,
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