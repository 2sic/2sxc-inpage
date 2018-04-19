import { ActionParams } from './action-params';
import { reloadAndReInitialize } from './render';
import { ContextOfButton } from '../context/context-of-button';
/*
 * this is a content block in the browser
 *
 * A Content Block is a stand alone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */

/**
 * internal helper, to do something and reload the content block
 * @param {ContextOfButton} context
 * @param {string} url
 * @param {ActionParams} params
 * @returns {any}
 */
function getAndReload(context: ContextOfButton, url: string, params: ActionParams): Promise<any> {
  return new Promise((resolve, reject) => {
      context.sxc.webApi.get(
        {
          url: url,
          params: params,
        }).done(resolve).fail(reject);
    }).then(() => { reloadAndReInitialize(context); });
}

/**
 * remove an item from a list, then reload
 * @param {ContextOfButton} context
 * @param {number} sortOrder
 * @returns {any}
 */
export function removeFromList(context: ContextOfButton, sortOrder: number): Promise<any> {
  return getAndReload(context,
    'view/module/removefromlist',
    { sortOrder: sortOrder } as ActionParams);
}

/**
 * change the order of an item in a list, then reload
 * @param {ContextOfButton} context
 * @param {number} initOrder
 * @param {number} newOrder
 * @returns {any}
 */
export function changeOrder(context: ContextOfButton, initOrder: number, newOrder: number): Promise<any> {
  return getAndReload(context,
    'view/module/changeorder',
    { sortOrder: initOrder, destinationSortOrder: newOrder } as ActionParams);
}

/**
 * add an item to the list at this position
 * @param {ContextOfButton} context
 * @param {number} sortOrder
 * @returns {any}
 */
export function addItem(context: ContextOfButton, sortOrder: number): Promise<any> {
  return getAndReload(context,
    'view/module/additem',
    { sortOrder: sortOrder } as ActionParams);
}

/**
 * set a content-item in this block to published, then reload
 * @param {ContextOfButton} context
 * @param {string} part
 * @param {number} sortOrder
 * @returns {any}
 */
export function publish(context: ContextOfButton, part: string, sortOrder: number): Promise<any> {
  return getAndReload(context,
    'view/module/publish',
    { part: part, sortOrder: sortOrder } as ActionParams);
}

/**
 * publish an item using it's ID
 * @param {ContextOfButton} context
 * @param {number} entityId
 * @returns {any}
 */
export function publishId(context: ContextOfButton, entityId: number): Promise<any> {
  return getAndReload(context,
    'view/module/publish',
    { id: entityId } as ActionParams);
}
