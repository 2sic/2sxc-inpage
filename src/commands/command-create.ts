import { ContextOfButton } from '../context/context-of-button';
import { Command } from './command';
import { Settings } from './settings';

/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
export function commandCreate(context: ContextOfButton, specialSettings: Settings): Command {

  const ngDialogUrl = context.sxc.sxcRootUrl +
    'desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver=' +
    context.sxc.version;

  const isDebug: string = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';

  const cmd = new Command(context, specialSettings, ngDialogUrl, isDebug);

  return cmd;
}
