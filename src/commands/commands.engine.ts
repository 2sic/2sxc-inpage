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

    // ToDo: remove dead code
    executeAction: (nameOrSettings, settings, event) => {

      // cycle parameters, in case it was called with 2 params only
      if (!event && settings && typeof settings.altKey !== 'undefined') { // no event param, but settings contains the event-object
        event = settings; // move it to the correct variable
        settings = {}; // clear the settings variable, as none was provided
      }

      // check if name is name (string) or object (settings)
      settings = (typeof nameOrSettings === 'string') ?
        Object.assign(settings || {}, {
          "action": nameOrSettings
        }) // place the name as an action-name into a command-object
        :
        nameOrSettings;

      let conf = engine.commands[settings.action];
      settings = Object.assign({}, conf, settings); // merge conf & settings, but settings has higher priority

      if (!settings.dialog) settings.dialog = settings.action; // old code uses "action" as the parameter, now use verb ? dialog
      if (!settings.code) settings.code = engine._openNgDialog; // decide what action to perform

      // pre-save event because afterwards we have a promise, so the event-object changes; funky syntax is because of browser differences
      let origEvent = event || window.event;

      if (conf.uiActionOnly) return settings.code(settings, origEvent, sxc);

      // if more than just a UI-action, then it needs to be sure the content-group is created first
      return prepareToAddContent(sxc, settings.useModuleList)
        .then(() => settings.code(settings, origEvent, sxc));
    }
  };

  return engine;
};
