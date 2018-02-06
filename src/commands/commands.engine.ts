import { initializeInstanceCommands } from './commands.instanceCommands';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { showOrToggle } from '../quick-dialog/2sxc._quickDialog';
import { translate } from '../translate/2sxc.translate';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { reloadAndReInitialize } from '../contentBlock/contentBlock.render';
import { prepareToAddContent } from '../contentBlock/contentBlock.templates';
import { Settings } from './settings';
import { Engine } from '../interfaces/engine';
import { Cmd } from './cmd';
import { Params } from './params';
import { create } from './create';
import { linkToNgDialog } from './link-to-ng-dialog';
import { openNgDialog } from './open-ng-dialog';
import { commandExecuteAction } from './command-execute-action';

export function instanceEngine(sxc: SxcInstanceWithInternals, editContext: DataEditContext) : Engine {
  let engine: Engine = {

    commands: initializeInstanceCommands(editContext),

    // assemble an object which will store the configuration and execute it
    create: (specialSettings: Settings) => {
      return create(sxc, editContext, specialSettings);
    },

    // create a dialog link
    _linkToNgDialog: (specialSettings: Settings) => {
      return linkToNgDialog(sxc, editContext, specialSettings);
    },

    // open a new dialog of the angular-ui
    _openNgDialog: (settings: Settings, event: any, sxc: SxcInstanceWithInternals) => {
      return openNgDialog(settings, event, sxc, editContext);
    },

    executeAction: (nameOrSettings, eventOrSettings?: any, event?: any) => {
      return commandExecuteAction(sxc, editContext, nameOrSettings, eventOrSettings, event);
    }
  };

  return engine;
};
