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
export function commandOpenNgDialog(context: ContextOfButton, event: any) {
  // the callback will handle events after closing the dialog
  // and reload the in-page view w/ajax or page reload
  const callback = () => {
    reloadAndReInitialize(context);
    // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
  };
  const link = commandLinkToNgDialog(context); // the link contains everything to open a full dialog (lots of params added)

  if (context.button.inlineWindow) {

    let fullScreen = false;
    if (!!context.button.fullScreen) {
      if (typeof (context.button.fullScreen) === 'function') {
        fullScreen = context.button.fullScreen(context);
      }
    }

    return showOrToggle(context,
      link,
      callback,
      fullScreen, /* settings.dialog === "item-history"*/
      context.button.dialog(context).toString());
  }

  const origEvent: any = event || window.event;

  if (context.button.newWindow || (origEvent && origEvent.shiftKey)) {
    return window.open(link);
  }

  return $2sxc.totalPopup.open(link, callback);
}
