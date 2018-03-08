import { ContextOfButton } from '../context/context-of-button';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { commandCreate } from './command-create';
import { commandExecuteAction } from './command-execute-action';
import { commandInitializeInstanceCommands } from './command-initialize-instance-commands';
import { commandLinkToNgDialog } from './command-link-to-ng-dialog';
import { commandOpenNgDialog } from './command-open-ng-dialog';
import { Settings } from './settings';
import { Commands } from '../toolbar2/command/commands';

export class Engine {
  commands = Commands.getInstance;

  // assemble an object which will store the configuration and execute it
  create = (context: ContextOfButton, specialSettings: Settings) => {
    return commandCreate(context, specialSettings);
  }

  // create a dialog link
  // ReSharper disable once InconsistentNaming
  // _linkToNgDialog = (specialSettings: Settings) => {
  //  return commandLinkToNgDialog(this.sxc, this.editContext, specialSettings);
  // }

  // open a new dialog of the angular-ui
  // ReSharper disable once InconsistentNaming
  // _openNgDialog = (settings: Settings, sxc: SxcInstanceWithInternals) => {
  //  return commandOpenNgDialog(sxc, this.editContext, settings);
  // }

  // executeAction = (nameOrSettings, eventOrSettings?: any, event?: any) => {
  //  debugger;
  //  //return commandExecuteAction(this.sxc, this.editContext, nameOrSettings, eventOrSettings, event);
  // }

  run2 = (context: ContextOfButton, nameOrSettings: any, eventOrSettings?: any, event?: any) => {
    // console.log('stv: context', context);
    return commandExecuteAction(context, nameOrSettings, eventOrSettings, event);
  }

}

export function instanceEngine(): Engine {
  return new Engine();
}
