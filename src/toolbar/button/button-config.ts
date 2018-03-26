import { Command } from '../../commands/command';
import { Settings } from '../../commands/settings';
import { ContextOfButton } from '../../context/context-of-button';
import { ButtonAction } from './button-action';

export class ButtonConfig {
  name: string = '';
  title: ((context: ContextOfButton) => string);
  params: ((context: ContextOfButton) => any);

  action: ButtonAction;

  classes: string = '';
  dialog: string = '';
  fullScreen: boolean = null;
  icon: string = '';
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

  //static fromNameAndParams(name: string, params: any, partialConfig?: Partial<ButtonConfig>): ButtonConfig {
  //  const buttonConfig = new ButtonConfig();
  //  buttonConfig.name = name;
  //  buttonConfig.params = params;
  //  // todo: look up command with this name
  //  // todo: create an action for that command
  //  // todo: use the commands tmpButtonDefaults as the initial value

  //  // use the config? to override anything
  //  if (partialConfig) {
  //    Object.assign(buttonConfig, partialConfig);
  //  }

  //  return buttonConfig;
  //}

  // disabled: boolean | (() => boolean) = false;
  disabled: ((context: ContextOfButton, settings: Settings) => boolean);
  // dynamicClasses: (() => string);
  dynamicClasses: ((context: ContextOfButton, settings: Settings) => string);
  dynamicDisabled: (() => boolean) = () => false; // maybe
  code: ((context: ContextOfButton, settings: Settings, sxc: SxcInstanceWithInternals) => void);

  configureCommand?(context: ContextOfButton, cmd: Command): void; // stv: todo ???

  // showCondition: boolean | (() => boolean) = true;
  showCondition: ((context: ContextOfButton, settings: Settings) => boolean);

  [propName: string]: any;
}
