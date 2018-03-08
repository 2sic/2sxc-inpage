import { ContextOfButton } from '../../context/context-of-button';
import { ButtonConfig } from '../button/button-config';
import { addClasses } from './render-helpers';

/**
 * generate the html for a button
 * @param sxc instance sxc
 * @param buttonConfig
 * @param groupIndex group-index in which the button is shown
 */
export function renderButton(context: ContextOfButton, buttonConfig: ButtonConfig, groupIndex: number): HTMLElement {

  const sxc = context.sxc.sxc;

  // if the button belongs to a content-item, move the specs up to the item into the settings-object
  flattenActionDefinition(buttonConfig);

  // retrieve configuration for this button
  const oldParamsAdapter: any = Object.assign({ action: buttonConfig.action.name, contentType: buttonConfig.action.params.contentType }, buttonConfig.action.params);
  // console.log('stv: oldParamsAdapter', oldParamsAdapter);

  const onclick: string = buttonConfig.disabled ?
    '' :
    `$2sxc(${sxc.id}, ${sxc.cbid}).manage.run2($2sxc.context(this), ${JSON.stringify(oldParamsAdapter)}, event);`;
  // `$2sxc(${sxc.id}, ${sxc.cbid}).manage.run(${JSON.stringify(oldParamsAdapter)}, event);`;

  const button = document.createElement('a');

  button.classList.add(`sc-${buttonConfig.action.name}`);

  button.classList.add(`group-${groupIndex}`);

  if (buttonConfig.disabled) {
    button.classList.add('disabled');
  }

  addClasses(button, buttonConfig.classes, ',');

  if (buttonConfig.dynamicClasses) {
    const dynamicClasses = buttonConfig.dynamicClasses(context, buttonConfig as any);
    addClasses(button, dynamicClasses, ' ');
  }

  button.setAttribute('onclick', onclick); // serialize JavaScript because of ajax

  button.setAttribute('data-i18n', `[title]${buttonConfig.title(context)}`); // localization support

  const box = document.createElement('div');

  const symbol = document.createElement('i');

  addClasses(symbol, buttonConfig.icon, ' ');

  symbol.setAttribute('aria-hidden', 'true');

  box.appendChild(symbol);

  button.appendChild(box);

  // console.log('stv: button2', button.outerHTML);

  return button;
}

/**
 * does some clean-up work on a button-definition object
 * because the target item could be specified directly, or in a complex internal object called entity
 * @param actDef
 */
function flattenActionDefinition(actDef: any) {
  if (!actDef.entity || !actDef.entity._2sxcEditInformation) return;

  const editInfo = actDef.entity._2sxcEditInformation;
  actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
  if (editInfo.entityId !== undefined) actDef.entityId = editInfo.entityId;
  if (editInfo.sortOrder !== undefined) actDef.sortOrder = editInfo.sortOrder;
  delete actDef.entity; // clean up edit-info
}
