import { Engine, instanceEngine } from '../commands/engine';
import { manipulator } from '../contentBlock/manipulate';
import { context, getContextFromEditContext } from '../context/context';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { ButtonDefinition } from '../toolbar/button/button-definition';
import { renderButton } from '../toolbar/item/render-button';
import { renderToolbar } from '../toolbar/item/render-toolbar';
import { expandToolbarConfig } from '../toolbar/toolbar/toolbar-expand-config';
import { buildInstanceConfig, buildNgDialogParams, buildQuickDialogConfig, getEditContext, getTag, getUserOfEditContext } from './api';
import { LocalStorageHelper } from './local-storage-helper';
import { UserOfEditContext } from './user-of-edit-context';
import { buttonConfigAdapter } from '../toolbar/adapters/button-config-adapter';
import { ToolbarSettings } from '../toolbar/toolbar/toolbar-settings';
import { ContextOfButton } from '../context/context-of-button';

/**
 * A helper-controller in charge of opening edit-dialogues + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 * @param sxc
 *
 * we must keep signature of initInstance for compatibility because it is used out of this project in ToSic.Sxc.Instance and 2sxc.api.js
 */
export function initInstance(sxc: SxcInstanceWithInternals) {
  try {
    _initInstance(sxc);
  } catch (e) {
    console.error('error in 2sxc - will log but not throw', e);
  }
}

// ReSharper disable once InconsistentNaming
function _initInstance(sxc: SxcInstanceWithInternals) {

  const editContext = getEditContext(sxc);

  const context = getContextFromEditContext(editContext);
  context.sxc.sxc = sxc; // stv: this is temp
  context.element = getTag(sxc); // HTMLElement

  const userInfo = getUserOfEditContext(editContext);
  const cmdEngine = instanceEngine(sxc);

  const editManager = new EditManager(sxc, editContext, userInfo, cmdEngine, context);
  editManager.init();
  sxc.manage = editManager;
  return editManager;
}

class EditManager {

  constructor(private sxc: SxcInstanceWithInternals,
    private editContext: DataEditContext,
    private userInfo: UserOfEditContext,
    private cmdEngine: Engine,
    private context: ContextOfButton) {
  }

  //#region Official, public properties and commands, which are stable for use from the outside

  /**
   * run a command - command used in toolbars and custom buttons
   */
  run = this.cmdEngine.run;

  /**
   * run2 a command - new command used in toolbars and custom buttons
   */
  run2 = this.cmdEngine.run2;

  /**
   * Generate a button (an <a>-tag) for one specific toolbar-action.
   * @param {Object<any>} actDef - settings, an object containing the spec for the expected button
   * @param {int} groupIndex - number what button-group it's in'
   * @returns {string} html of a button
   */
  getButton = (actDef: ButtonDefinition, groupIndex: number): string => {
    //const tag: any = getTag(this.sxc);
    //const myContext = context(tag);

    const newButtonConfig = buttonConfigAdapter(
      this.context,
      actDef,
      groupIndex);

    this.context.button = newButtonConfig;
 
    const button = renderButton(this.context, groupIndex);

    return button.outerHTML;
  }

  /**
   * Builds the toolbar and returns it as HTML
   * @param {Object<any>} tbConfig - general toolbar config
   * @param {Object<any>} moreSettings - additional / override settings
   * @returns {string} html of the current toolbar
   */
  getToolbar = (tbConfig: any, moreSettings: ToolbarSettings): string => {
    //const tag: any = getTag(this.sxc);
    //const myContext = context(tag);
    const toolbarConfig = expandToolbarConfig(
      this.context,
      tbConfig,
      moreSettings);

    this.context.toolbar = toolbarConfig;

    return renderToolbar(this.context);
  };

  //#endregion official, public properties - everything below this can change at any time

  // ReSharper disable InconsistentNaming
  /**
   * internal method to find out if it's in edit-mode
   */
  _isEditMode = () => this.editContext.Environment.IsEditable;

  /**
   * used for various dialogues
   */
  _reloadWithAjax = this.editContext.ContentGroup.SupportsAjax;

  _dialogParameters = buildNgDialogParams(this.sxc, this.editContext);

  /**
   * used to configure buttons / toolbars
   */
  _instanceConfig = buildInstanceConfig(this.editContext);

  /**
   * metadata necessary to know what/how to edit
   */
  _editContext = this.editContext;

  /**
   * used for in-page dialogues
   */
  _quickDialogConfig = buildQuickDialogConfig(this.editContext);

  /**
   * used to handle the commands for this content-block
   */
  _commands = this.cmdEngine;

  _user = this.userInfo;

  /**
   * private: show error when the app-data hasn't been installed yet for this imported-module
   */
  _handleErrors = (errType: any, cbTag: any) => {
    const errWrapper = $('<div class="dnnFormMessage dnnFormWarning sc-element"></div>');
    let msg = '';
    const toolbar = $("<ul class='sc-menu'></ul>");
    if (errType === 'DataIsMissing') {
      msg =
        'Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import';
      toolbar.attr('data-toolbar', '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
    }
    errWrapper.append(msg);
    errWrapper.append(toolbar);
    $(cbTag).append(errWrapper);
  }

  /**
   * change config by replacing the guid, and refreshing dependent sub-objects
   */
  _updateContentGroupGuid = (newGuid: string, context: ContextOfButton) => {
    
    this.editContext.ContentGroup.Guid = newGuid;
    this._instanceConfig = buildInstanceConfig(this.editContext);
    // todo: stv, it should not be 2 guid's
    context.app.guid = newGuid;
    context.contentBlock.contentGroupId = newGuid;
  }

  _getCbManipulator = () => manipulator(this.sxc);
  // ReSharper restore InconsistentNaming

  /**
   * init this object
   */
  init = () => {
    //const tag = getTag(this.sxc);
    // enhance UI in case there are known errors / issues
    if (this.editContext.error.type)
      this._handleErrors(this.editContext.error.type, this.context.element);

    // todo: move this to dialog-handling
    // display the dialog
    const openDialogId = LocalStorageHelper.getItemValue<number>('dia-cbid');
    if (this.editContext.error.type || !openDialogId || openDialogId !== this.sxc.cbid) return false;
    sessionStorage.removeItem('dia-cbid');
    this.run2(this.context, 'layout');
    return true;
  }

}
