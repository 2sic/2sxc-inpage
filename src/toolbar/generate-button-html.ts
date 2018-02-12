// does some clean-up work on a button-definition object
// because the target item could be specified directly, or in a complex internal object called entity
function flattenActionDefinition(actDef) {
  if (!actDef.entity || !actDef.entity._2sxcEditInformation) return;

  let editInfo = actDef.entity._2sxcEditInformation;
  actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
  if (editInfo.entityId !== undefined) actDef.entityId = editInfo.entityId;
  if (editInfo.sortOrder !== undefined) actDef.sortOrder = editInfo.sortOrder;
  delete actDef.entity; // clean up edit-info
}

// generate the html for a button
// Expects: instance sxc, action-definition, + group-index in which the button is shown
export function generateButtonHtml(sxc, actDef, groupIndex: number): any {

  // if the button belongs to a content-item, move the specs up to the item into the settings-object
  flattenActionDefinition(actDef);

  // retrieve configuration for this button
  let showClasses: string = 'group-' + groupIndex + (actDef.disabled ? ' disabled' : '');
  const classesList = (actDef.classes || '').split(',');
  const box: any = $('<div/>');
  const symbol: any = $('<i class="' + actDef.icon + '" aria-hidden="true"></i>');
  const onclick: string = actDef.disabled ?
      '' :
      '$2sxc(' + sxc.id + ', ' + sxc.cbid + ').manage.run(' + JSON.stringify(actDef.command) + ', event);';

  for (let c = 0; c < classesList.length; c++) showClasses += ' ' + classesList[c];

  let button = $('<a />', {
    'class': 'sc-' + actDef.action + ' ' + showClasses +
    (actDef.dynamicClasses ? ' ' + actDef.dynamicClasses(actDef) : ''),
    'onclick': onclick,
    'data-i18n': '[title]' + actDef.title
  });
  button.html(box.html(symbol));
  return button[0].outerHTML;
}
