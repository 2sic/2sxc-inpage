import { renderer } from '../contentBlock/render';
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

  return new Promise<any>(resolvePromise => {

    // prepare promise for callback when the dialog closes
    // to reload the in-page view w/ajax or page reload
    const resolveAndReInit = () => {
      resolvePromise(context);
      renderer.reloadAndReInitialize(context);
    };

    // check if inline window (quick-dialog)
    if (context.button.inlineWindow) {

      // test if it should be full screen (value or resolve-function)
      if (typeof (context.button.fullScreen) === 'function')
        fullScreen = context.button.fullScreen(context);
      const diagName = context.button.dialog(context).toString();

      quickDialog.showOrToggleFromToolbar(context, link, fullScreen, diagName)
        .then(isChanged => { if(isChanged) resolveAndReInit(); });

    // else it's a normal pop-up dialog
    } else {
      // check if new-window
      if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
        resolvePromise(context);
        window.open(link);
      } else {
        $2sxc.totalPopup.open(link, resolveAndReInit);
      }

    }
  });
}
