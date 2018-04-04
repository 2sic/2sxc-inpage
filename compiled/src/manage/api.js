"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import { InstanceConfig } from './instance-config';
//import { NgDialogParams } from './ng-dialog-params';
//import { QuickDialogConfig } from './quick-dialog-config';
//import { UserOfEditContext } from './user-of-edit-context';
//import { ContextOfButton } from '../context/context-of-button';
/**
 * Get a html tag of the current sxc instance
 * @param {SxcInstanceWithInternals} sxci
 * @return {jquery} - resulting html
 */
function getTag(sxci) {
    return $("div[data-cb-id='" + sxci.cbid + "']")[0];
}
exports.getTag = getTag;
/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @param {any} htmlTag
 * @return {DataEditContext} edit-context object
 */
/*export*/ function getEditContextOfTag(htmlTag) {
    var attr = htmlTag.getAttribute('data-edit-context');
    return JSON.parse(attr || '');
}
/**
 * get edit-context info of an sxc-object
 * @param {SxcInstanceWithInternals} sxc
 * @return {DataEditContext} edit context info
 */
function getEditContext(sxc) {
    return getEditContextOfTag(getTag(sxc));
}
exports.getEditContext = getEditContext;
// 2dm disabled
// todo q2stv - I think we don't need this any more
///**
// * builds a config object used in the toolbar system
// * @param {ContextOfButton} context
// * @returns {InstanceConfig} object containing various properties for this current sxc-instance
// */
//export function buildInstanceConfig(context: ContextOfButton): InstanceConfig {
//  return InstanceConfig.fromContext(context);
//}
// 2dm disabled
// todo q2stv - I think we don't need this any more
///**
// * builds UserOfEditcontext object
// * @param {ContextOfButton} context
// * @returns {UserOfEditContext} object containing user of edit context
// */
//export function getUserOfEditContext(context: ContextOfButton): UserOfEditContext {
//  return UserOfEditContext.fromContext(context);
//}
// 2dm disabled
// todo q2stv - I think we don't need this any more
///**
// * create a config-object for the quick-dialog, with all settings which the quick-dialog will need
// * @param {ContextOfButton} context
// * @returns {QucikDialogConfig} object containing the quick dialog config
// */
//export function buildQuickDialogConfig(context: ContextOfButton): QuickDialogConfig {
//  return QuickDialogConfig.fromContext(context);
//}
// 2dm disabled
// todo q2stv - I think we don't need this any more
///**
// * get all parameters needed by NG dialogues from an sxc
// * @param {ContextOfButton} context
// * @return {NgDialogParams} special object containing the ng-dialog parameters
// */
//export function buildNgDialogParams(context: ContextOfButton): NgDialogParams {
//  return NgDialogParams.fromContext(context);
//}
//# sourceMappingURL=api.js.map