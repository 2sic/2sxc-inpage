import { ButtonConfig } from '../toolbar2/button/config';
import { Definition } from './definition';

/**
 * helper function to create the configuration object
 * @param name
 * @param translateKey
 * @param icon
 * @param uiOnly
 * @param partOfPage
 * @param more
 */

export function makeDef(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Definition): Definition {
  if (typeof (partOfPage) !== 'boolean')
    throw 'partOfPage in commands not provided, order will be wrong!';

  let btnConfig: Partial<ButtonConfig> = {
    icon: 'icon-sxc-' + icon,
    classes: '',
    title: 'Toolbar.' + translateKey,
    dynamicClasses: () => '',
    show: true,
    showCondition: () => true,
    disabled: false,
    dynamicDisabled: () => false,
  } as Partial<ButtonConfig>;
  btnConfig = Object.assign(btnConfig, more) as Partial<ButtonConfig>;

  let newDefinition: Definition = {
    name: name,
    title: btnConfig.title,// 'Toolbar.' + translateKey,
    icon: btnConfig.icon,// 'icon-sxc-' + icon,
    uiActionOnly: uiOnly,
    partOfPage: partOfPage,
    tmpButtonDefaults: btnConfig,
  };

  return Object.assign(newDefinition, more) as Definition;
}
