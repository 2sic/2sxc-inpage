import { ToolbarConfigTemplates } from './toolbar-config-templates';
import { Log } from '../../logging/log';

/**
 * the toolbar manager is an internal helper
 * taking care of toolbars, buttons etc.
 * @param canDesign
 * @param sharedParameters
 */
export function toolbarStandardButtons(canDesign: boolean, sharedParameters: any[], parentLog: Log) {
  const log = new Log('Tlb.StdBtn', parentLog, `will retrieve standard buttons assuming design:${canDesign} - this should be factored away soon as not relevant any more`);
  // create a deep-copy of the original object
  const toolbarTemplate = new ToolbarConfigTemplates(log).get('default'); // use default toolbar template
  const btns = $.extend(true, {}, toolbarTemplate);
  btns.params = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
  if (!canDesign) {
    // remove this menu
    btns.groups.splice(2, 1);
  } 

  return btns;
}
