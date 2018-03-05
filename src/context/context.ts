import { DataEditContext } from '../data-edit-context/data-edit-context';
import { getEditContext } from '../manage/api';
import { Commands } from '../toolbar2/command/commands';
import { renderToolbar } from '../toolbar2/item/render-toolbar';
import { ToolbarConfig } from '../toolbar2/toolbar/toolbar-config';
import { ExpandToolbarConfig } from '../toolbar2/toolbar/toolbar-expand-config';
import { settingsForEmptyToolbar, ToolbarSettings } from '../toolbar2/toolbar/toolbar-settings';
import { getSxcInstance } from '../x-bootstrap/sxc';
import { ContextOfButton } from './context-of-button';


/**
 * Primary API to get the context
 * @param context
 */
export function context(context: HTMLElement): HTMLElement {
  debugger;

  //const sxc: SxcInstanceWithInternals = getSxcInstance(context);
  //const editContext: DataEditContext = getEditContext(sxc);
  // console.log('stv: sxc, editContext', sxc, editContext);

  //const cob = new ContextOfButton();
  //console.log('stv: context', context);
  //return cob;

  return context;
}


