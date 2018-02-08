import { DataEditContext } from '../data-edit-context/data-edit-context';
import { InstanceConfig } from './instance-config';
import { UserOfEditContext } from './user-of-edit-context';
import { QucikDialogConfig } from './qucik-dialog-config';
import { NgDialogParams } from './ng-dialog-params';

//declare let window: Window;

//let mngApi = $2sxc._manage;

/**
 * Get a html tag of the current sxc instance
 * @param {SxcInstanceWithInternals} sxci
 * @return {jquery} - resulting html
 */
export function getTag(sxci: SxcInstanceWithInternals): any {
  return $(`div[data-cb-id='${sxci.cbid}']`)[0];
};

/**
 * get the edit-context object (a json object) of the current tag/sxc-instance
 * @param {any} htmlTag
 * @return {DataEditContext} edit-context object
 */
export function getEditContextOfTag(htmlTag: any): DataEditContext {
  let attr = htmlTag.getAttribute('data-edit-context');
  return JSON.parse(attr || '') as DataEditContext;
};

/**
 * get edit-context info of an sxc-object
 * @param {SxcInstanceWithInternals} sxc
 * @return {DataEditContext} edit context info
 */
export function getEditContext(sxc: SxcInstanceWithInternals): DataEditContext {
  return getEditContextOfTag(getTag(sxc));
};

/**
 * builds a config object used in the toolbar system
 * @param {DataEditContext} editContext
 * @returns {InstanceConfig} object containing various properties for this current sxc-instance
 */
export function buildInstanceConfig(editContext: DataEditContext): InstanceConfig {
  return new InstanceConfig(editContext);
};

/**
 * builds UserOfEditcontext object
 * @param {DataEditContext} editContext
 * @returns {UserOfEditContext} object containing user of edit context
 */
export function getUserOfEditContext(editContext: DataEditContext): UserOfEditContext {
  return new UserOfEditContext(editContext);
};

/**
 * create a config-object for the quick-dialog, with all settings which the quick-dialog will need
 * @param {DataEditContext} editContext
 * @returns {QucikDialogConfig} object containing the quick dialog config
 */
export function buildQuickDialogConfig(editContext: DataEditContext): QucikDialogConfig {
  return new QucikDialogConfig(editContext);
};

/**
 * get all parameters needed by NG dialogs from an sxc
 * @param {SxcInstanceWithInternals} sxc
 * @param {DataEditContext} [editContext]
 * @return {NgDialogParams} special object containing the ng-dialog parameters
 */
export function buildNgDialogParams(sxc: SxcInstanceWithInternals, editContext: DataEditContext): NgDialogParams {
  if (!editContext) editContext = getEditContext(sxc);
  return new NgDialogParams(sxc, editContext);
};
