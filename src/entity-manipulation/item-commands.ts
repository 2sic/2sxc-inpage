﻿import { translate } from '../translate/2sxc.translate';
import { ContextOfButton } from '../context/context-of-button';
import { WebApiParams } from '../contentBlock/web-api-params';

/**
 * this enhances the $2sxc client controller with stuff only needed when logged in
 */

// #region contentItem Commands
export let contentItems = {
  // delete command - try to really delete a content-item
  delete: (context: ContextOfButton, itemId: number, itemGuid: string, itemTitle: string): Promise<any> => {
    // first show main warning / get ok
    const ok = confirm(translate('Delete.Confirm')
      .replace('{id}', String(itemId))
      .replace('{title}', itemTitle));

    if (!ok) {
      return Promise.resolve();
    }

    const params: WebApiParams = {
      lang: context.app.currentLanguage,
      cbisentity: context.contentBlock.isEntity,
      cbid: context.contentBlock.id,
      originalparameters: JSON.stringify(context.instance.parameters),
    };

    return new Promise((resolve: any, reject: any) => {
      context.sxc.webApi.delete(`app-content/any/${itemGuid}`, params, null, true)
        .done((data: any, textStatus: string, jqXHR: any) => {
          if (jqXHR.status === 204 || jqXHR.status === 200) {
            // resolve the promise with the response text
            resolve(data);
          } else {
            // check if it's a permission config problem
            const msgJs = translate('Delete.ErrCheckConsole');
            if (jqXHR.status === 401) alert(translate('Delete.ErrPermission') + msgJs);
            if (jqXHR.status === 400) alert(translate('Delete.ErrInUse') + msgJs);
            // otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(textStatus));
          }
        }).fail((jqXHR: any, textStatus: string, errorThrown: string) => {
          reject(Error(errorThrown));
        });
    }).then((result: any) => {
      location.reload();
    }).catch((error: any) => {
      console.log(error);
    });
  },
};

