import { translate } from '../translate/2sxc.translate';
import { ContextOfButton } from '../context/context-of-button';

/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */

// #region contentItem Commands
export let contentItems = {
  // delete command - try to really delete a content-item
  delete: (context: ContextOfButton, itemId: number, itemGuid: string, itemTitle: string) => {
    // first show main warning / get ok
    const ok = confirm(translate('Delete.Confirm')
      .replace('{id}', itemId.toString())
      .replace('{title}', itemTitle));
    if (!ok) return;
    context.sxc.webApi.delete(`app-content/any/${itemGuid}`, null, null, true)
      .success(() => {
        location.reload();
      }).error((error: any) => {
        const msgJs = translate('Delete.ErrCheckConsole');
        console.log(error);

        // check if it's a permission config problem
        if (error.status === 401) alert(translate('Delete.ErrPermission') + msgJs);
        if (error.status === 400) alert(translate('Delete.ErrInUse') + msgJs);
      });
  },
};
