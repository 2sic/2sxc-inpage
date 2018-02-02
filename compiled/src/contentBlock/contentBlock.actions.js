"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contentBlock_render_1 = require("./contentBlock.render");
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
function getAndReload(sxc, url, params) {
    return sxc.webApi.get({
        url: url,
        params: params
    }).then(function () { contentBlock_render_1.reloadAndReInitialize(sxc); });
}
;
/**
 * remove an item from a list, then reload
 * @param {} sxc
 * @param {} sortOrder
 * @returns {}
 */
function removeFromList(sxc, sortOrder) {
    return getAndReload(sxc, 'view/module/removefromlist', { sortOrder: sortOrder });
}
exports.removeFromList = removeFromList;
;
/**
 * change the order of an item in a list, then reload
 * @param {} sxc
 * @param {} initOrder
 * @param {} newOrder
 * @returns {}
 */
function changeOrder(sxc, initOrder, newOrder) {
    return getAndReload(sxc, 'view/module/changeorder', { sortOrder: initOrder, destinationSortOrder: newOrder });
}
exports.changeOrder = changeOrder;
;
/**
 * add an item to the list at this position
 * @param {} sxc
 * @param {} sortOrder
 * @returns {}
 */
function addItem(sxc, sortOrder) {
    return getAndReload(sxc, 'view/module/additem', { sortOrder: sortOrder });
}
exports.addItem = addItem;
;
/**
 * set a content-item in this block to published, then reload
 * @param {} sxc
 * @param {} part
 * @param {} sortOrder
 * @returns {}
 */
function publish(sxc, part, sortOrder) {
    return getAndReload(sxc, 'view/module/publish', { part: part, sortOrder: sortOrder });
}
exports.publish = publish;
;
/**
 * publish an item using it's ID
 * @param {} sxc
 * @param {} entityId
 * @returns {}
 */
function publishId(sxc, entityId) {
    return getAndReload(sxc, 'view/module/publish', { id: entityId });
}
exports.publishId = publishId;
;
//# sourceMappingURL=contentBlock.actions.js.map