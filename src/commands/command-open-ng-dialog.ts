import { reloadAndReInitialize } from '../contentBlock/render';
import { ContextOfButton } from '../context/context-of-button';
import { $2sxcInPage as $2sxc } from '../interfaces/sxc-controller-in-page';
import { windowInPage as window } from '../interfaces/window-in-page';
import { showOrToggle } from '../quick-dialog/quick-dialog';
import { commandLinkToNgDialog } from './command-link-to-ng-dialog';

/**
 * open a new dialog of the angular-ui
 * @param settings
 * @param event
 * @param sxc
 * @param editContext
 */
export function commandOpenNgDialog(context: ContextOfButton, event: any) : Promise<any> {

  // testing this - ideally it should now work as a promise...
  return new Promise<any>((resolve, reject) => {

    // the callback will handle events after closing the dialog
    // and reload the in-page view w/ajax or page reload
    const callback = () => {
      reloadAndReInitialize(context);
      resolve(context);
      // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
    };

    // the link contains everything to open a full dialog (lots of params added)
    const link = commandLinkToNgDialog(context);

    if (context.button.inlineWindow) {

      let fullScreen = false;
      if (!!context.button.fullScreen) {
        if (typeof (context.button.fullScreen) === 'function') {
          fullScreen = context.button.fullScreen(context);
        }
      }

      /*return*/ showOrToggle(context,
        link,
        callback,
        fullScreen,
        context.button.dialog(context).toString());
    } else {
      const origEvent: any = event || window.event;

      if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
        /*return*/
        window.open(link);
        resolve(context);
        //return;
      }
      else
      /*return*/
      $2sxc.totalPopup.open(link, callback);
    }
  });
}
