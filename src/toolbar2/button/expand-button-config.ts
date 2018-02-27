import { Definition } from '../../commands/definition';
import { ButtonConfig } from './button-config';

export function ExpandButtonConfig(context, buttonConfig: ButtonConfig): ButtonConfig {
  // todo

  return buttonConfig;
}

export function GetButtonConfigDefaultsV1(name: string, icon: string, translateKey: string, uiOnly: boolean, partOfPage: boolean, more: Definition): Partial<ButtonConfig> {
  // stv: v1 code
  const partialButtonConfig = {
    icon: 'icon-sxc-' + icon,
    title: 'Toolbar.' + translateKey,
    uiActionOnly: uiOnly,
    partOfPage: partOfPage,
  } as Partial<ButtonConfig>;

  Object.assign(partialButtonConfig, more);

  return partialButtonConfig;
}
