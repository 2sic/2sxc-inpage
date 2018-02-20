import { Command } from '../../commands/command';
import { ModConfig } from '../../commands/mod-config';
import { Settings } from '../../commands/settings';
import { CommandDefinition } from '../command/command-definition';
import { ButtonAction } from './button-action';

export class ButtonConfig {
  name: string = '';
  params: any[] = [];

  classes: string = '';
  dialog: string = '';
  fullScreen: boolean = null;
  icon: string = '';
  inlineWindow: boolean = null;
  newWindow: boolean = null;
  partOfPage: boolean = null;
  show: boolean = null; // maybe
  title: string = '';
  uiActionOnly: boolean = null;

  constructor(public action?: ButtonAction, partialConfig?: Partial<ButtonConfig>, commands?: CommandDefinition[]) {

    if (action) {
      this.action = action;
    }

    if (partialConfig) Object.assign(this, partialConfig);
  }

  static fromNameAndParams(name: string, params: any[], partialConfig?: Partial<ButtonConfig>, commands?: CommandDefinition): ButtonConfig {

    const buttonConfig = new ButtonConfig();
    buttonConfig.name = name;
    buttonConfig.params = params;

    // todo: look up command with this name
    // const tmpCommandDefinition: CommandDefinition = commands[name];
    // console.log('stv: code in ButtonConfig: ', name, commands);

    // todo create an action for that command

    // todo: use the commands tmpButtonDefaults as the initial value

    // use the config? to override anything
    if (partialConfig) Object.assign(buttonConfig, partialConfig);

    return buttonConfig;
  }

  // disabled: boolean | (() => boolean) = false;
  disabled: ((settings: Settings, modConfig: ModConfig) => boolean);
  // dynamicClasses: (() => string);
  dynamicClasses: ((settings: Settings) => string);
  dynamicDisabled: (() => boolean) = () => false; // maybe
  code: ((settings: Settings, event: ModConfig, sxc: SxcInstanceWithInternals) => void);
  configureCommand?(cmd: Command): void; // stv: todo ???
  // showCondition: boolean | (() => boolean) = true;
  showCondition: ((settings: Settings, modConfig: ModConfig) => boolean | number | string);

}
