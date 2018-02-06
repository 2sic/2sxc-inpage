import { initializeInstanceCommands } from './commands.instanceCommands';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { showOrToggle } from '../quick-dialog/2sxc._quickDialog';
import { translate } from '../translate/2sxc.translate';
import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
import { reloadAndReInitialize } from '../contentBlock/contentBlock.render';
import { prepareToAddContent } from '../contentBlock/contentBlock.templates';
import { extend } from '../lib-helpers/2sxc._lib.extend';
import { Settings } from './settings';
import { Engine } from '../interfaces/engine';
import { Cmd } from './cmd';
import { Params } from './params';
import { create } from './create';

export function instanceEngine(sxc: SxcInstanceWithInternals, editContext: DataEditContext) : Engine {
  let engine: Engine = {
    commands: initializeInstanceCommands(editContext),

    // assemble an object which will store the configuration and execute it
    create: (specialSettings) => {
      return create(sxc, editContext, specialSettings);
    },

    // create a dialog link
    _linkToNgDialog(specialSettings: any) : string {
      let cmd = sxc.manage._commands.create(specialSettings);

      if (cmd.settings.useModuleList) cmd.addContentGroupItemSetsToEditList(true);
      else cmd.addSimpleItem();

      // if the command has own configuration stuff, do that now
      if (cmd.settings.configureCommand) cmd.settings.configureCommand(cmd);

      return cmd.generateLink();
    },

    // open a new dialog of the angular-ui
    _openNgDialog(settings: any, event: any, sxc: any) {
      // the callback will handle events after closing the dialog
      // and reload the in-page view w/ajax or page reload
      let callback = () => {
        reloadAndReInitialize(sxc);
        // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
      };
      let link: string = engine._linkToNgDialog(settings); // the link contains everything to open a full dialog (lots of params added)
      if (settings.inlineWindow)
        return showOrToggle(sxc, link, callback, settings.fullScreen /* settings.dialog === "item-history"*/, settings.dialog);
      if (settings.newWindow || (event && event.shiftKey))
        return window.open(link);
      return twoSxc.totalPopup.open(link, callback);
    },

    // ToDo: remove dead code
    executeAction(nameOrSettings, settings, event) {

      // cycle parameters, in case it was called with 2 params only
      if (!event && settings && typeof settings.altKey !== 'undefined') { // no event param, but settings contains the event-object
        event = settings; // move it to the correct variable
        settings = {}; // clear the settings variable, as none was provided
      }

      // pre-save event because afterwards we have a promise, so the event-object changes; funky syntax is because of browser differences
      let origEvent = event || window.event;

      // check if name is name (string) or object (settings)
      settings = (typeof nameOrSettings === 'string') ?
        extend(settings || {}, {
          "action": nameOrSettings
        }) // place the name as an action-name into a command-object
        :
        nameOrSettings;

      let conf = engine.commands[settings.action];
      settings = extend({}, conf, settings); // merge conf & settings, but settings has higher priority

      if (!settings.dialog) settings.dialog = settings.action; // old code uses "action" as the parameter, now use verb ? dialog
      if (!settings.code) settings.code = engine._openNgDialog; // decide what action to perform

      if (conf.uiActionOnly) return settings.code(settings, origEvent, sxc);

      // if more than just a UI-action, then it needs to be sure the content-group is created first
      return prepareToAddContent(sxc, settings.useModuleList)
        .then(() => settings.code(settings, origEvent, sxc));
    }
  };

  return engine;
};
