﻿import { ContextOfButton } from '../context/context-of-button';
import { windowInPage as window } from '../interfaces/window-in-page';
import { Dialog } from '../settings/dialog';
import { Command } from './command';

/**
 * assemble an object which will store the configuration and execute it
 * @param sxc
 * @param editContext
 * @param specialSettings
 */
export function commandCreate(context: ContextOfButton): Command {

  const ngDialogUrl = context.instance.sxcRootUrl +
    'desktopmodules/tosic_sexycontent/' +
    ((context.ui.form === 'ng5' && context.button.dialog(context) === 'edit') ? Dialog.ng5 : Dialog.ng1) +
    '?sxcver=' + context.instance.sxcVersion;

  const isDebug: string = window.$2sxc.urlParams.get('debug') ? '&debug=true' : '';

  const cmd = new Command(context, ngDialogUrl, isDebug);

  return cmd;
}
