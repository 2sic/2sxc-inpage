import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.

twoSxc._toolbarManager.standardButtons = standardButtons;
//return;

function standardButtons(canDesign, sharedParameters) {
  // create a deep-copy of the original object
  let btns = $.extend(true, {}, twoSxc._toolbarManager.toolbarTemplate);
  btns.params = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
  if (!canDesign) btns.groups.splice(2, 1); // remove this menu
  return btns;
}
