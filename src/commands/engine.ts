import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { showOrToggle } from '../quick-dialog/2sxc._quickDialog';
import { translate } from '../translate/2sxc.translate';
import { reloadAndReInitialize } from '../contentBlock/contentBlock.render';
import { prepareToAddContent } from '../contentBlock/contentBlock.templates';
import { Settings } from './settings';
import { Cmd } from './cmd';
import { Params } from './params';
import { commandInitializeInstanceCommands } from './command-initialize-instance-commands';
import { commandCreate } from './command-create';
import { commandLinkToNgDialog } from './command-link-to-ng-dialog';
import { commandOpenNgDialog } from './command-open-ng-dialog';
import { commandExecuteAction } from './command-execute-action';

export class Engine {

  constructor(public sxc: SxcInstanceWithInternals, public editContext: DataEditContext) { }

  commands = commandInitializeInstanceCommands(this.editContext);

  // assemble an object which will store the configuration and execute it
  create = (specialSettings: Settings) => {
    return commandCreate(this.sxc, this.editContext, specialSettings);
  };

  // create a dialog link
  _linkToNgDialog = (specialSettings: Settings) => {
    return commandLinkToNgDialog(this.sxc, this.editContext, specialSettings);
  };

  // open a new dialog of the angular-ui
  _openNgDialog = (settings: Settings, event: any, sxc: SxcInstanceWithInternals) => {
    return commandOpenNgDialog(this.sxc, this.editContext, settings, event);
  };

  executeAction = (nameOrSettings, eventOrSettings?: any, event?: any) => {
    return commandExecuteAction(this.sxc, this.editContext, nameOrSettings, eventOrSettings, event);
  };

}

export function instanceEngine(sxc: SxcInstanceWithInternals, editContext: DataEditContext): Engine {
  return new Engine(sxc, editContext);
};
