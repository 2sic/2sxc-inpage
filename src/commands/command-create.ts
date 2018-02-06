import { translate } from '../translate/2sxc.translate';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { Settings } from './settings';
import { Command } from './command';
import { Params } from './params';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { NgDialogParams } from '../manage/ng-dialog-params';

/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
export function commandCreate(sxc: SxcInstanceWithInternals, editContext: DataEditContext, specialSettings: Settings): Command {

  let settings: Settings = Object.assign(sxc.manage._instanceConfig, specialSettings) as Settings; // merge button with general toolbar-settings

  let ngDialogUrl: string = editContext.Environment.SxcRootUrl +
    'desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver=' +
    editContext.Environment.SxcVersion;

  let isDebug: string = twoSxc.urlParams.get('debug') ? '&debug=true' : '';

  let cmd = new Command(sxc, settings, ngDialogUrl, isDebug);
  
  return cmd;
}