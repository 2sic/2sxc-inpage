import { Def } from './def';
import { extend } from '../lib-helpers/2sxc._lib.extend';

/**
 * helper function to create the configuration object
 * @param name
 * @param translateKey
 * @param icon
 * @param uiOnly
 * @param partOfPage
 * @param more
 */

export function makeDef(name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Def): Def {
  if (typeof (partOfPage) !== 'boolean')
    throw 'partOfPage in commands not provided, order will be wrong!';

  let newDefinition: Def = {
    name: name,
    title: 'Toolbar.' + translateKey,
    icon: 'icon-sxc-' + icon,
    uiActionOnly: uiOnly,
    partOfPage: partOfPage
  };

  return extend(newDefinition, more) as Def;
}