import { Engine, instanceEngine } from '../commands/engine';
import { manipulator } from '../contentBlock/manipulate';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { renderButton } from '../toolbar2/item/render-button';
import { buildInstanceConfig, buildNgDialogParams, buildQuickDialogConfig, getEditContext, getTag, getUserOfEditContext } from './api';
import { LocalStorageHelper } from './local-storage-helper';
import { UserOfEditContext } from './user-of-edit-context';


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
  // ReSharper disable AssignedValueIsNeverUsed
  const userInfo = getUserOfEditContext(editContext);
  const cmdEngine = instanceEngine(sxc, editContext);
  // ReSharper restore AssignedValueIsNeverUsed

  const editManager = new EditManager(sxc, editContext, userInfo, cmdEngine);
  editManager.init();
  sxc.manage = editManager;
  return editManager;
}

class EditManager {

  constructor(private sxc: SxcInstanceWithInternals, private editContext: DataEditContext, private userInfo: UserOfEditContext, private cmdEngine: Engine) { }

  //#region Official, public properties and commands, which are stable for use from the outside
  /**
   * run a command - often used in toolbars and custom buttons
   */
  run = this.cmdEngine.executeAction;

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
  getButton = (actDef, groupIndex) => renderButton(this.sxc, actDef, groupIndex).outerHTML;

  /**
   * Builds the toolbar and returns it as HTML
   * @param {Object<any>} tbConfig - general toolbar config
   * @param {Object<any>} moreSettings - additional / override settings
   * @returns {string} html of the current toolbar
   */
  // getToolbar = (tbConfig, moreSettings) => generateToolbarHtml(this.sxc, tbConfig, moreSettings);

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
  _handleErrors = (errType, cbTag) => {
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
  _updateContentGroupGuid = (newGuid: string) => {
    this.editContext.ContentGroup.Guid = newGuid;
    this._instanceConfig = buildInstanceConfig(this.editContext);
  }

  _getCbManipulator = () => manipulator(this.sxc);
  // ReSharper restore InconsistentNaming

  /**
   * init this object
   */
  init = () => {
    // enhance UI in case there are known errors / issues
    if (this.editContext.error.type)
      this._handleErrors(this.editContext.error.type, getTag(this.sxc));

    // todo: move this to dialog-handling
    // display the dialog
    const openDialogId = LocalStorageHelper.getItemValue<number>('dia-cbid');
    if (this.editContext.error.type || !openDialogId || openDialogId !== this.sxc.cbid) return false;
    sessionStorage.removeItem('dia-cbid');
    this.run('layout');
    return true;
  }

}
