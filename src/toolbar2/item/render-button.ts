import { ButtonConfig } from '../button/button-config';

// generate the html for a button
// Expects: instance sxc, action-definition, + group-index in which the button is shown
export function renderButton(sxc: SxcInstanceWithInternals, buttonConfig: ButtonConfig, groupIndex: number): string {
  // debugger;
  // if the button belongs to a content-item, move the specs up to the item into the settings-object
  flattenActionDefinition(buttonConfig);

  // retrieve configuration for this button
  let showClasses: string = 'group-' + groupIndex + (buttonConfig.disabled ? ' disabled' : '');
  const classesList = (buttonConfig.classes || '').split(',');
  const box: any = $('<div/>');
  const symbol: any = $('<i class="' + buttonConfig.icon + '" aria-hidden="true"></i>');
  const oldParamsAdapter: any = Object.assign({ action: buttonConfig.action.name, contentType: buttonConfig.action.params.contentType }, buttonConfig.action.params);
  // console.log('stv: oldParamsAdapter', oldParamsAdapter);
  const onclick: string = buttonConfig.disabled ?
    '' :
    '$2sxc(' + sxc.id + ', ' + sxc.cbid + ').manage.run(' + JSON.stringify(oldParamsAdapter) + ', event);';

  for (let c = 0; c < classesList.length; c++) {
    showClasses += ' ' + classesList[c];
  }

  const button = $('<a />', {
    'class': 'sc-' + buttonConfig.action.name + ' ' + showClasses +
      (buttonConfig.dynamicClasses ? ' ' + buttonConfig.dynamicClasses(buttonConfig as any) : ''),
    'onclick': onclick,
    'data-i18n': '[title]' + buttonConfig.title,
  });
  button.html(box.html(symbol));

  // console.log('stv: buttonHtml', button[0].outerHTML);

  return button[0].outerHTML;
}

/**
 * does some clean-up work on a button-definition object
 * because the target item could be specified directly, or in a complex internal object called entity
 * @param actDef
 */
function flattenActionDefinition(actDef) {
  if (!actDef.entity || !actDef.entity._2sxcEditInformation) return;

  const editInfo = actDef.entity._2sxcEditInformation;
  actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
  if (editInfo.entityId !== undefined) actDef.entityId = editInfo.entityId;
  if (editInfo.sortOrder !== undefined) actDef.sortOrder = editInfo.sortOrder;
  delete actDef.entity; // clean up edit-info
}
