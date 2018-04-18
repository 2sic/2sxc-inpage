import { translate } from '../translate/2sxc.translate';
import { ContextOfButton } from '../context/context-of-button';

/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */

// #region contentItem Commands
export let contentItems = {
  // delete command - try to really delete a content-item
  delete: (context: ContextOfButton, itemId: number, itemGuid: string, itemTitle: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      // first show main warning / get ok
      const ok = confirm(translate('Delete.Confirm')
        .replace('{id}', itemId.toString())
        .replace('{title}', itemTitle));

      if (!ok) {
        return resolve();
      }

      // convert jQuery ajax promise object to ES6 promise
      const deletePromise = new Promise((resolve, reject) => {
        context.sxc.webApi.delete(`app-content/any/${itemGuid}`, null, null, true)
          .success(() => {
            resolve();
          }).error((error: any) => {
            reject(error);
          });
      });

      return deletePromise
        .then(() => {
          location.reload();
        })
        .catch((error: any) => {
          const msgJs = translate('Delete.ErrCheckConsole');
          console.log(error);

          // check if it's a permission config problem
          if (error.status === 401) alert(translate('Delete.ErrPermission') + msgJs);
          if (error.status === 400) alert(translate('Delete.ErrInUse') + msgJs);
        });
    });
  },
};
