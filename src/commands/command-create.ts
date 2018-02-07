import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { Settings } from './settings';
import { Command } from './command';
import { DataEditContext } from '../data-edit-context/data-edit-context';

/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
export function commandCreate(sxc: SxcInstanceWithInternals, editContext: DataEditContext, specialSettings: Settings): Command {

  const settings: Settings = Object.assign(sxc.manage._instanceConfig, specialSettings) as Settings; // merge button with general toolbar-settings

  const ngDialogUrl: string = editContext.Environment.SxcRootUrl +
    'desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver=' +
    editContext.Environment.SxcVersion;

  const isDebug: string = twoSxc.urlParams.get('debug') ? '&debug=true' : '';

  const cmd = new Command(sxc, settings, ngDialogUrl, isDebug);
  
  return cmd;
}