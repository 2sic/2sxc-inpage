import { ToolbarConfigTemplates } from './toolbar-config-templates';

/**
 * the toolbar manager is an internal helper
 * taking care of toolbars, buttons etc.
 * @param canDesign
 * @param sharedParameters
 */
export function toolbarStandardButtons(canDesign: boolean, sharedParameters: any[]) {
  // create a deep-copy of the original object
  const toolbarTemplate = new ToolbarConfigTemplates().get('default'); // use default toolbar template
  const btns = $.extend(true, {}, toolbarTemplate);
  btns.params = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
  if (!canDesign) btns.groups.splice(2, 1); // remove this menu
  // console.log('stv: btns', JSON.stringify(btns));
  return btns;
}
