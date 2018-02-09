import { instanceEngine } from '../commands/engine';
import { getTag, getEditContext, getUserOfEditContext, buildNgDialogParams, buildInstanceConfig, buildQuickDialogConfig } from './api';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { manipulator } from '../contentBlock/manipulate';
import { LocalStorageHelper } from './local-storage-helper';
import { EditManager } from './edit-manager';

/**
 * A helper-controller in charge of opening edit-dialogs + creating the toolbars for it
 * all in-page toolbars etc.
 * if loaded, it's found under the $2sxc(module).manage
 * it has commands to
 * - getButton
 * - getToolbar
 * - run(...)
 * - isEditMode
 * @param sxc
 */
export function initInstance(sxc) {
  try {
    _initInstance(sxc);
  } catch (e) {
    console.error('error in 2sxc - will log but not throw', e);
  }
};


// ReSharper disable once InconsistentNaming
function _initInstance(sxc: SxcInstanceWithInternals) {
  let editContext = getEditContext(sxc);
  let userInfo = getUserOfEditContext(editContext);
  let cmdEngine = instanceEngine(sxc, editContext);

  let editManager: EditManager = sxc.manage = {
    //#region Official, public properties and commands, which are stable for use from the outside
    /**
     * run a command - often used in toolbars and custom buttons
     */
    run: cmdEngine.executeAction,

    /**
     * Generate a button (an <a>-tag) for one specific toolbar-action.
     * @param {Object<any>} actDef - settings, an object containing the specs for the expected buton
     * @param {int} groupIndex - number what button-group it's in'
     * @returns {string} html of a button
     */
    getButton: (actDef, groupIndex) => twoSxc._toolbarManager.generateButtonHtml(sxc, actDef, groupIndex),

    /**
     * Builds the toolbar and returns it as HTML
     * @param {Object<any>} tbConfig - general toolbar config
     * @param {Object<any>} moreSettings - additional / override settings
     * @returns {string} html of the current toolbar
     */
    getToolbar: (tbConfig, moreSettings) => twoSxc._toolbarManager.generateToolbarHtml(sxc, tbConfig, moreSettings),
    //#endregion official, public properties - everything below this can change at any time

    // internal method to find out if it's in edit-mode
    _isEditMode: () => editContext.Environment.IsEditable,
    _reloadWithAjax: editContext.ContentGroup.SupportsAjax,
    _dialogParameters: buildNgDialogParams(sxc, editContext),      // used for various dialogs
    _instanceConfig: buildInstanceConfig(editContext), // used to configure buttons / toolbars
    _editContext: editContext,              // metadata necessary to know what/how to edit
    _quickDialogConfig: buildQuickDialogConfig(editContext),           // used for in-page dialogs
    _commands: cmdEngine,                        // used to handle the commands for this content-block
    _user: userInfo,

    // init this object 
    init: () => {
      // enhance UI in case there are known errors / issues
      if (editContext.error.type)
        editManager._handleErrors(editContext.error.type, getTag(sxc));

      // todo: move this to dialog-handling
      // display the dialog
      let openDialogId: number = LocalStorageHelper.getItemValue<number>('dia-cbid');
      if (editContext.error.type || !openDialogId || openDialogId !== sxc.cbid) return false;
      sessionStorage.removeItem('dia-cbid');
      editManager.run('layout');
    },

    // private: show error when the app-data hasn't been installed yet for this imported-module
    _handleErrors: (errType, cbTag) => {
      let errWrapper = $('<div class="dnnFormMessage dnnFormWarning sc-element"></div>');
      let msg = '';
      let toolbar = $("<ul class='sc-menu'></ul>");
      if (errType === 'DataIsMissing') {
        msg = 'Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import';
        toolbar.attr('data-toolbar', '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
      }
      errWrapper.append(msg);
      errWrapper.append(toolbar);
      $(cbTag).append(errWrapper);
    },

    // change config by replacing the guid, and refreshing dependend sub-objects
    _updateContentGroupGuid: (newGuid: string) => {
      editContext.ContentGroup.Guid = newGuid;
      editManager._instanceConfig = buildInstanceConfig(editContext);
    },

    _getCbManipulator: () => manipulator(sxc)
  };

  editManager.init();
  return editManager;
}
