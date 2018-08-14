import { HasLog } from '../logging/has-log';
import { Log } from '../logging/log';
import { buildToolbars, disable, isDisabled } from './build-toolbars';
import { renderButton } from './item/render-button';
import { renderToolbar } from './item/render-toolbar';
import { ToolbarConfigTemplates } from './toolbar/toolbar-config-templates';

/**
 * Toolbar manager for the whole page - basically a set of APIs
 * the toolbar manager is an internal helper taking care of toolbars, buttons etc.
 */
export class ToolbarManager extends HasLog {
  constructor(parentLog :Log) {
    super('Tlb.Mngr', parentLog, 'init');
  }
  
  // internal constants
  //cDisableAttrName: string = 'data-disable-toolbar';
  // build toolbars
  //buildToolbars: this.build.build;

  buildToolbars(parentTag: any, optionalId?: number) {
    buildToolbars(this.log, parentTag, optionalId);
  }

  disable = disable;
  isDisabled = isDisabled;
  // generate button html
  generateButtonHtml = renderButton;
  generateToolbarHtml = renderToolbar;
  toolbarTemplate = ToolbarConfigTemplates.Instance(this.log).get('default');
}

export const disableToolbarAttribute = 'data-disable-toolbar';

//2dm 2018-03-22 this seems to be unused
const sharedTbm = new ToolbarManager(null);
export const _toolbarManager = sharedTbm;// new ToolbarManager();
