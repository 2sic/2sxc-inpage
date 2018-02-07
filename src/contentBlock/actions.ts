import { ActionParams } from './action-params';
import { reloadAndReInitialize } from './render';
/*
 * this is a content block in the browser
 * 
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */

/**
 * internal helper, to do something and reload the content block
 * @param sxc 
 * @param url 
 * @param params 
 * @returns {} 
 */
function getAndReload(sxc: SxcInstanceWithInternals, url: string, params: ActionParams): any {
  return sxc.webApi.get({
    url: url,
    params: params
  }).then(() => { reloadAndReInitialize(sxc); });
};

/**
 * remove an item from a list, then reload
 * @param {} sxc 
 * @param {} sortOrder 
 * @returns {} 
 */
export function removeFromList(sxc: SxcInstanceWithInternals, sortOrder: number): any {
  return getAndReload(sxc, 'view/module/removefromlist', { sortOrder: sortOrder } as ActionParams);
};

/**
 * change the order of an item in a list, then reload
 * @param {} sxc 
 * @param {} initOrder 
 * @param {} newOrder 
 * @returns {} 
 */
export function changeOrder(sxc: SxcInstanceWithInternals, initOrder: number, newOrder: number): any {
  return getAndReload(sxc, 'view/module/changeorder',
    { sortOrder: initOrder, destinationSortOrder: newOrder } as ActionParams);
};

/**
 * add an item to the list at this position
 * @param {} sxc 
 * @param {} sortOrder 
 * @returns {} 
 */
export function addItem(sxc: SxcInstanceWithInternals, sortOrder: number): any {
  return getAndReload(sxc, 'view/module/additem', { sortOrder: sortOrder } as ActionParams);
};

/**
 * set a content-item in this block to published, then reload
 * @param {} sxc 
 * @param {} part 
 * @param {} sortOrder 
 * @returns {} 
 */
export function publish(sxc: SxcInstanceWithInternals, part:string, sortOrder:number): any {
  return getAndReload(sxc, 'view/module/publish', { part: part, sortOrder: sortOrder } as ActionParams);
};

/**
 * publish an item using it's ID
 * @param {} sxc 
 * @param {} entityId 
 * @returns {} 
 */
export function publishId(sxc: SxcInstanceWithInternals, entityId: number): any {
  return getAndReload(sxc, 'view/module/publish', { id: entityId } as ActionParams);
};
