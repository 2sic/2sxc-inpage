import { DataEditContext } from '../data-edit-context/data-edit-context';
import { commandCreate } from './command-create';
import { commandExecuteAction } from './command-execute-action';
import { commandInitializeInstanceCommands } from './command-initialize-instance-commands';
import { commandLinkToNgDialog } from './command-link-to-ng-dialog';
import { commandOpenNgDialog } from './command-open-ng-dialog';
import { Settings } from './settings';
import { getSxcInstance } from '../x-bootstrap/sxc';
import { getEditContext } from '../manage/api';

export class Engine {
  constructor(public sxc: SxcInstanceWithInternals, public editContext: DataEditContext) { }

  commands = commandInitializeInstanceCommands(this.editContext);

  // assemble an object which will store the configuration and execute it
  create = (specialSettings: Settings) => {
    return commandCreate(this.sxc, this.editContext, specialSettings);
  }

  // create a dialog link
  // ReSharper disable once InconsistentNaming
  _linkToNgDialog = (specialSettings: Settings) => {
    return commandLinkToNgDialog(this.sxc, this.editContext, specialSettings);
  }

  // open a new dialog of the angular-ui
  // ReSharper disable once InconsistentNaming
  _openNgDialog = (settings: Settings, event: any, sxc: SxcInstanceWithInternals) => {
    return commandOpenNgDialog(sxc, this.editContext, settings, event);
  }

  executeAction = (nameOrSettings, eventOrSettings?: any, event?: any) => {
    return commandExecuteAction(this.sxc, this.editContext, nameOrSettings, eventOrSettings, event);
  }

  run2 = (context, nameOrSettings, eventOrSettings?: any, event?: any) => {
    console.log('stv: context', context);
    //const sxc: SxcInstanceWithInternals = getSxcInstance(context);
    //const editContext: DataEditContext = getEditContext(sxc);
    return commandExecuteAction(context.sxc, context.editContext, nameOrSettings, eventOrSettings, event);
  }

}

export function instanceEngine(sxc: SxcInstanceWithInternals, editContext: DataEditContext): Engine {
  return new Engine(sxc, editContext);
}
