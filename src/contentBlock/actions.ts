import { ActionParams } from './action-params';
import { reloadAndReInitialize } from './render';
import { ContextOfButton } from '../context/context-of-button';
import { getSxcInstance } from '../x-bootstrap/sxc';
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
 * @param context
 * @param url
 * @param params
 * @returns {}
 */
function getAndReload(context: ContextOfButton, url: string, params: ActionParams): any {
  const sxc = getSxcInstance(context.instance.id);
  return sxc.webApi.get({
    url: url,
    params: params,
  }).then(() => { reloadAndReInitialize(context); });
}

/**
 * remove an item from a list, then reload
 * @param {} context
 * @param {} sortOrder
 * @returns {}
 */
export function removeFromList(context: ContextOfButton, sortOrder: number): any {
  return getAndReload(context,
    'view/module/removefromlist',
    { sortOrder: sortOrder } as ActionParams);
}

/**
 * change the order of an item in a list, then reload
 * @param {} context
 * @param {} initOrder
 * @param {} newOrder
 * @returns {}
 */
export function changeOrder(context: ContextOfButton, initOrder: number, newOrder: number): any {
  return getAndReload(context,
    'view/module/changeorder',
    { sortOrder: initOrder, destinationSortOrder: newOrder } as ActionParams);
}

/**
 * add an item to the list at this position
 * @param {} sxc
 * @param {} sortOrder
 * @returns {}
 */
export function addItem(context: ContextOfButton, sortOrder: number): any {
  return getAndReload(context,
    'view/module/additem',
    { sortOrder: sortOrder } as ActionParams);
}

/**
 * set a content-item in this block to published, then reload
 * @param {} sxc
 * @param {} part
 * @param {} sortOrder
 * @returns {}
 */
export function publish(context: ContextOfButton, part: string, sortOrder: number): any {
  return getAndReload(context,
    'view/module/publish',
    { part: part, sortOrder: sortOrder } as ActionParams);
}

/**
 * publish an item using it's ID
 * @param {} sxc
 * @param {} entityId
 * @returns {}
 */
export function publishId(context: ContextOfButton, entityId: number): any {
  return getAndReload(context,
    'view/module/publish',
    { id: entityId } as ActionParams);
}
