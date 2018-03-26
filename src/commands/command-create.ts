import { ContextOfButton } from '../context/context-of-button';
import { Command } from './command';
import { Settings } from './settings';

/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
export function commandCreate(context: ContextOfButton): Command {
  const ngDialogUrl = context.sxc.editContext.Environment.SxcRootUrl +
    'desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver=' +
    context.sxc.editContext.Environment.SxcVersion;

  const isDebug: string = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';

  const cmd = new Command(context, ngDialogUrl, isDebug);

  return cmd;
}
