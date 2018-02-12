import { toolbarManager } from './build-toolbars';
/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
export class ToolbarManager {
  // internal constants
  cDisableAttrName: string = 'data-disable-toolbar';
}

export const _toolbarManager = new ToolbarManager();
Object.assign(_toolbarManager, toolbarManager);
