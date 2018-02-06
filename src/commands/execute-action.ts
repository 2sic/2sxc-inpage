import { Settings } from './settings';
import { extend } from '../lib-helpers/2sxc._lib.extend';
import { sxc } from '../x-bootstrap/module-bootstrapper';
import { prepareToAddContent } from '../contentBlock/contentBlock.templates';
import { initializeInstanceCommands } from './commands.instanceCommands';
import { DataEditContext } from '../data-edit-context/data-edit-context';
import { openNgDialog } from './open-ng-dialog';

export function executeAction(nameOrSettings, settings, event, engine) {

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