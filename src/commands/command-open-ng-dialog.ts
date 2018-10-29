import { reloadAndReInitialize } from '../contentBlock/render';
import { ContextOfButton } from '../context/context-of-button';
import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
import { windowInPage as window } from '../interfaces/window-in-page';
import { commandLinkToNgDialog } from './command-link-to-ng-dialog';
import { quickDialog } from '../quick-dialog/quick-dialog';

/**
 * open a new dialog of the angular-ui
 * @param settings
 * @param event
 * @param sxc
 * @param editContext
 */

export function commandOpenNgDialog(context: ContextOfButton, event: any) : Promise<any> {

  // the link contains everything to open a full dialog (lots of params added)
  const link = commandLinkToNgDialog(context);

  let fullScreen = false;
  const origEvent: any = event || window.event;

  return new Promise<any>(resolve => {

    // prepare promise for callback when the dialog closes
    // to reload the in-page view w/ajax or page reload
    const closeCallback = () => {
      resolve(context); // resolve the promise
      reloadAndReInitialize(context);
    };

    // check if inline window (quick-dialog)
    if (context.button.inlineWindow) {

      // test if it should be full screen (value or resolve-function)
      if (typeof (context.button.fullScreen) === 'function')
        fullScreen = context.button.fullScreen(context);

      quickDialog.showOrToggle(context, link, closeCallback, fullScreen,
        context.button.dialog(context).toString());

    // else it's a normal pop-up dialog
    } else {
      // check if new-window
      if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
        resolve(context);
        window.open(link);
      } else {
        $2sxc.totalPopup.open(link, closeCallback);
      }

    }
  });
}
