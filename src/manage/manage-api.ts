export type ManageApi = {
  run: (nameOrSettings: any, settings?: any, event?: any) => any;
  getButton: (actDef: any, groupIndex: any) => any;
  getToolbar: (tbConfig: any, moreSettings: any) => any;
  _isEditMode: () => boolean;
  _reloadWithAjax: boolean;
  _dialogParameters;
  _instanceConfig;
  _editContext;
  _quickDialogConfig;
  _commands: IEngine;
  _user;
  init: () => boolean;
  _handleErrors: (errType: any, cbTag: any) => void;
  _updateContentGroupGuid: (newGuid: any) => void;
  _getCbManipulator: () => any;
};