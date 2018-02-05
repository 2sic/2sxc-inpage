import { translate } from '../translate/2sxc.translate';

/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */

//#region contentItem Commands
export let contentItems = {
  // delete command - try to really delete a content-item
  "delete": (sxc: SxcInstanceWithInternals, itemId: number, itemGuid: string, itemTitle: string) => {
    // first show main warning / get ok
    let ok = confirm(translate('Delete.Confirm')
      .replace('{id}', itemId)
      .replace('{title}', itemTitle));
    if (!ok) return;

    sxc.webApi.delete('app-content/any/' + itemGuid, null, null, true)
      .success(() => {
        location.reload();
      }).error(error => {
        const msgJs = translate('Delete.ErrCheckConsole');
        console.log(error);

        // check if it's a permission config problem
        if (error.status === 401) alert(translate('Delete.ErrPermission') + msgJs);
        if (error.status === 400) alert(translate('Delete.ErrInUse') + msgJs);
      });
  }
};
