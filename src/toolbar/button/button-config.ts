import { Command } from '../../commands/command';
import { Settings } from '../../commands/settings';
import { ContextOfButton } from '../../context/context-of-button';
import { ButtonAction } from './button-action';

export class ButtonConfig {
  name: string = '';
  action: ButtonAction;
  classes: string = '';
  dialog: string = '';
  fullScreen: boolean = null;
  inlineWindow: boolean = null;
  newWindow: boolean = null;
  show: boolean = null; // maybe

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

  code: ((context: ContextOfButton) => void);
  configureCommand?(context: ContextOfButton, cmd: Command): void; // stv: todo ???
  disabled: ((context: ContextOfButton) => boolean);
  dynamicClasses: ((context: ContextOfButton) => string);
  dynamicDisabled: (() => boolean) = () => false; // maybe
  icon: ((context: ContextOfButton) => string);
  params: ((context: ContextOfButton) => any);
  partOfPage: ((context: ContextOfButton) => boolean);
  showCondition: ((context: ContextOfButton) => boolean);
  title: ((context: ContextOfButton) => string);
  uiActionOnly: ((context: ContextOfButton) => boolean);

  [propName: string]: any;
}
