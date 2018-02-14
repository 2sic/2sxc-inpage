import { toolbarTemplate } from './toolbar-template';

/**
 * the toolbar manager is an internal helper
 * taking care of toolbars, buttons etc.
 * @param canDesign
 * @param sharedParameters
 */
export function standardButtons(canDesign, sharedParameters) {
  // create a deep-copy of the original object
  const btns = $.extend(true, {}, toolbarTemplate);
  btns.params = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
  if (!canDesign) btns.groups.splice(2, 1); // remove this menu
  return btns;
}
