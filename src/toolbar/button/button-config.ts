import { Command } from '../../commands/command';
import { Settings } from '../../commands/settings';
import { ContextOfButton } from '../../context/context-of-button';
import { ButtonAction } from './button-action';

export class ButtonConfig {
  name: string = '';

  // params: any;

  action: ButtonAction;

  classes: string = '';
  dialog: string = '';
  fullScreen: boolean = null;

  inlineWindow: boolean = null;
  newWindow: boolean = null;
  partOfPage: boolean = null;
  show: boolean = null; // maybe

  uiActionOnly: boolean = null;

  constructor(action?: ButtonAction, partialConfig?: Partial<ButtonConfig>) {
    if (action && action.commandDefinition && action.commandDefinition.buttonConfig) {
      this.action = action;
      // get defaults from action commandDefinition
      Object.assign(this, action.commandDefinition.buttonConfig);
    }

    if (partialConfig) {
      Object.assign(this, partialConfig);
    }
  }

  icon: ((context: ContextOfButton) => string);
  title: ((context: ContextOfButton) => string);
  params: ((context: ContextOfButton) => any);
  disabled: ((context: ContextOfButton) => boolean);
  dynamicClasses: ((context: ContextOfButton) => string);
  dynamicDisabled: (() => boolean) = () => false; // maybe
  code: ((context: ContextOfButton) => void);

  configureCommand?(context: ContextOfButton, cmd: Command): void; // stv: todo ???

  // showCondition: boolean | (() => boolean) = true;
  showCondition: ((context: ContextOfButton) => boolean);

  [propName: string]: any;
}
