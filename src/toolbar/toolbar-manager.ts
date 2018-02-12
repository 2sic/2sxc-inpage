import { buildToolbars, disable, isDisabled } from './build-toolbars';
import { generateButtonHtml } from './generate-button-html';
/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
export class ToolbarManager {
  // internal constants
  cDisableAttrName: string = 'data-disable-toolbar';
  // build toolbars
  buildToolbars = buildToolbars;
  disable = disable;
  isDisabled = isDisabled;
  // generate button html
  generateButtonHtml = generateButtonHtml;
}

export const _toolbarManager = new ToolbarManager();
