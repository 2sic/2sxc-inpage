"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_engine_1 = require("../commands/commands.engine");
var manage_api_1 = require("./manage.api");
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
var contentBlock_manipulate_1 = require("../contentBlock/contentBlock.manipulate");
var local_storage_helper_1 = require("./local-storage-helper");
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
function initInstance(sxc) {
    try {
        _initInstance(sxc);
    }
    catch (e) {
        console.error('error in 2sxc - will log but not throw', e);
    }
}
exports.initInstance = initInstance;
;
//let mngApi = twoSxc._manage;
function _initInstance(sxc) {
    var editContext = manage_api_1.getEditContext(sxc);
    var userInfo = manage_api_1.getUserOfEditContext(editContext);
    var cmdEngine = commands_engine_1.instanceEngine(sxc, editContext);
    var editManager = sxc.manage = {
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
        getButton: function (actDef, groupIndex) { return module_bootstrapper_1.$2sxc._toolbarManager.generateButtonHtml(sxc, actDef, groupIndex); },
        /**
         * Builds the toolbar and returns it as HTML
         * @param {Object<any>} tbConfig - general toolbar config
         * @param {Object<any>} moreSettings - additional / override settings
         * @returns {string} html of the current toolbar
         */
        getToolbar: function (tbConfig, moreSettings) { return module_bootstrapper_1.$2sxc._toolbarManager.generateToolbarHtml(sxc, tbConfig, moreSettings); },
        //#endregion official, public properties - everything below this can change at any time
        // internal method to find out if it's in edit-mode
        _isEditMode: function () { return editContext.Environment.IsEditable; },
        _reloadWithAjax: editContext.ContentGroup.SupportsAjax,
        _dialogParameters: manage_api_1.buildNgDialogParams(sxc, editContext),
        _instanceConfig: manage_api_1.buildInstanceConfig(editContext),
        _editContext: editContext,
        _quickDialogConfig: manage_api_1.buildQuickDialogConfig(editContext),
        _commands: cmdEngine,
        _user: userInfo,
        // init this object 
        init: function () {
            // enhance UI in case there are known errors / issues
            if (editContext.error.type)
                editManager._handleErrors(editContext.error.type, manage_api_1.getTag(sxc));
            // todo: move this to dialog-handling
            // display the dialog
            var openDialogId = local_storage_helper_1.LocalStorageHelper.getItemValue('dia-cbid');
            if (editContext.error.type || !openDialogId || openDialogId !== sxc.cbid)
                return false;
            sessionStorage.removeItem('dia-cbid');
            editManager.run('layout');
        },
        // private: show error when the app-data hasn't been installed yet for this imported-module
        _handleErrors: function (errType, cbTag) {
            var errWrapper = $('<div class="dnnFormMessage dnnFormWarning sc-element"></div>');
            var msg = '';
            var toolbar = $("<ul class='sc-menu'></ul>");
            if (errType === 'DataIsMissing') {
                msg = 'Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import';
                toolbar.attr('data-toolbar', '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
            }
            errWrapper.append(msg);
            errWrapper.append(toolbar);
            $(cbTag).append(errWrapper);
        },
        // change config by replacing the guid, and refreshing dependend sub-objects
        _updateContentGroupGuid: function (newGuid) {
            editContext.ContentGroup.Guid = newGuid;
            editManager._instanceConfig = manage_api_1.buildInstanceConfig(editContext);
        },
        _getCbManipulator: function () { return contentBlock_manipulate_1.manipulator(sxc); }
    };
    editManager.init();
    return editManager;
}
//# sourceMappingURL=manage.create.js.map