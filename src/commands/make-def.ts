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

  let newDefinition: Definition = {
    name: name,
    title: 'Toolbar.' + translateKey,
    icon: 'icon-sxc-' + icon,
    uiActionOnly: uiOnly,
    partOfPage: partOfPage
  };

  return Object.assign(newDefinition, more) as Definition;
}