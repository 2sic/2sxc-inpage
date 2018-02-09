//import { getEditContext, getUserOfEditContext } from "./api";
//import { instanceEngine, Engine } from "../commands/engine";
//import { DataEditContext } from "../data-edit-context/data-edit-context";
//import { UserOfEditContext } from "./user-of-edit-context";
//import { instanceEngine } from '../commands/engine';
//import { getTag, getEditContext, getUserOfEditContext, buildNgDialogParams, buildInstanceConfig, buildQuickDialogConfig } from './api';
//import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
//import { manipulator } from '../contentBlock/manipulate';
//import { LocalStorageHelper } from './local-storage-helper';

export type EditManager = {
  run: (nameOrSettings: any, eventOrSettings?: any, event?: any) => any;
  getButton: (actDef: any, groupIndex: any) => any;
  getToolbar: (tbConfig: any, moreSettings: any) => any;
  _isEditMode: () => boolean;
  _reloadWithAjax: boolean;
  _dialogParameters;
  _instanceConfig;
  _editContext;
  _quickDialogConfig;
  _commands;
  _user;
  init: () => boolean;
  _handleErrors: (errType: any, cbTag: any) => void;
  _updateContentGroupGuid: (newGuid: string) => void;
  _getCbManipulator: () => any;
};