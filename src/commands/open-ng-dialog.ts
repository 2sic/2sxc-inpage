import { Settings } from './settings';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { linkToNgDialog } from './link-to-ng-dialog';
import { reloadAndReInitialize } from '../contentBlock/contentBlock.render';
import { showOrToggle } from '../quick-dialog/2sxc._quickDialog';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';

// open a new dialog of the angular-ui
export function openNgDialog(settings: Settings, event: any, sxc: SxcInstanceWithInternals, editContext: DataEditContext) {
  // the callback will handle events after closing the dialog
  // and reload the in-page view w/ajax or page reload
  let callback = () => {
    reloadAndReInitialize(sxc);
    // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
  };
  let link: string = linkToNgDialog(sxc, editContext, settings); // the link contains everything to open a full dialog (lots of params added)
  if (settings.inlineWindow)
    return showOrToggle(sxc, link, callback, settings.fullScreen /* settings.dialog === "item-history"*/, settings.dialog);
  if (settings.newWindow || (event && event.shiftKey))
    return window.open(link);
  return twoSxc.totalPopup.open(link, callback);
}
