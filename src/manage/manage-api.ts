import { Engine } from '../commands/engine';

export interface ManageApi {
  init: () => boolean;
  run: (nameOrSettings: any, settings?: any, event?: any) => any;
  getButton: (actDef: any, groupIndex: any) => any;
  getToolbar: (tbConfig: any, moreSettings: any) => any;
  // ReSharper disable InconsistentNaming
  _isEditMode: () => boolean;
  _reloadWithAjax: boolean;
  _dialogParameters;
  _instanceConfig;
  _editContext;
  _quickDialogConfig;
  _commands: Engine;
  _user;
  _handleErrors: (errType: any, cbTag: any) => void;
  _updateContentGroupGuid: (newGuid: any) => void;
  _getCbManipulator: () => any;
  // ReSharper restore InconsistentNaming
}
