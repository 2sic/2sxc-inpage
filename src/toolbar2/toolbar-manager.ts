import { buildToolbars, disable, isDisabled } from './build-toolbars';
import { renderButton } from './item/render-button';
import { renderToolbar } from './item/render-toolbar';
import { toolbarTemplate } from './toolbar-template';
import { toolbarStandardButtons } from './toolbar/toolbar-standard-buttons';

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
  generateButtonHtml = renderButton;
  generateToolbarHtml = renderToolbar;
  standardButtons = toolbarStandardButtons;
  toolbarTemplate = toolbarTemplate;
}

export const _toolbarManager = new ToolbarManager();
