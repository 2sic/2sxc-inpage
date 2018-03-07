import { reloadAndReInitialize } from '../contentBlock/render';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { showOrToggle } from '../quick-dialog/quick-dialog';
import { commandLinkToNgDialog } from './command-link-to-ng-dialog';
import { Settings } from './settings';

/**
 * open a new dialog of the angular-ui
 * @param settings
 * @param event
 * @param sxc
 * @param editContext
 */
export function commandOpenNgDialog(sxc: SxcInstanceWithInternals, editContext: DataEditContext, settings: Settings) {
  // the callback will handle events after closing the dialog
  // and reload the in-page view w/ajax or page reload
  const callback = () => {
    reloadAndReInitialize(sxc);
    // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
  };
  const link: string = commandLinkToNgDialog(sxc, editContext, settings); // the link contains everything to open a full dialog (lots of params added)

  if (settings.inlineWindow)
    return showOrToggle(sxc, link, callback, settings.fullScreen /* settings.dialog === "item-history"*/, settings.dialog);

  if (settings.newWindow /*|| (event && event.shiftKey)*/)
    return window.open(link);

  return $2sxc.totalPopup.open(link, callback);
}
