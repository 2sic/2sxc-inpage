import { prepareToAddContent } from '../contentBlock/templates';
import { ContextOfButton } from '../context/context-of-button';
import { commandOpenNgDialog } from './command-open-ng-dialog';
import { Commands } from './commands';
import { Settings } from './settings';
import { parametersAdapter } from '../toolbar/adapters/parameters-adapter';
import { ButtonAction } from '../toolbar/button/button-action';
import { ButtonConfig } from '../toolbar/button/button-config';
import { settingsAdapter } from '../toolbar/adapters/settings-adapter';
import { addDefaultBtnSettings } from '../toolbar/button/expand-button-config';
import { Log } from '../logging/log';

// ToDo: remove dead code
export function commandExecuteAction(
  context: ContextOfButton,
  nameOrSettings: any,
  eventOrSettings?: any,
  event?: any) {

  const log = new Log('Tlb.ExecAct', null, 'start');

  const sxc = context.sxc.sxc;

  let settings: Settings = eventOrSettings;

  // cycle parameters, in case it was called with 2 params only
  if (!event && eventOrSettings && typeof eventOrSettings.altKey !== 'undefined') { // no event param, but settings contains the event-object
    event = eventOrSettings; // move it to the correct variable
    settings = {} as Settings; // clear the settings variable, as none was provided
  }

  // check if name is name (string) or object (settings)
  settings = (typeof nameOrSettings === 'string')
    ? Object.assign(
      settings || {},
      {
        action: nameOrSettings,
      }) // place the name as an action-name into a command-object
    : nameOrSettings;

  const conf = Commands.getInstance().get(settings.action).buttonConfig;
  settings = Object.assign(
    {},
    conf,
    settings) as Settings; // merge conf & settings, but settings has higher priority

  // pre-save event because afterwards we have a promise, so the event-object changes; funky syntax is because of browser differences
  const origEvent = event || window.event;

  const name = settings.action;
  const contentType = settings.contentType;

  // Toolbar API v2
  const newButtonAction = new ButtonAction(name, contentType, settings);
  newButtonAction.commandDefinition = Commands.getInstance().get(name);
  const newButtonConfig = new ButtonConfig(newButtonAction);
  newButtonConfig.name = name;

  context.button = Object.assign(newButtonConfig,
    newButtonAction.commandDefinition.buttonConfig,
    settingsAdapter(settings)) as ButtonConfig; // merge conf & settings, but settings has higher priority

  if (!context.button.dialog) {
    context.button.dialog = (contextParam: ContextOfButton) => {
      return name;
    }; // old code uses "action" as the parameter, now use verb ? dialog
  }

  if (!context.button.code) {
    context.button.code = (contextParam: ContextOfButton) => {
      return commandOpenNgDialog(contextParam);
    }; // decide what action to perform
  }

  if (context.button.uiActionOnly) {
    return context.button.code(context);
  }

  // if more than just a UI-action, then it needs to be sure the content-group is created first
  return prepareToAddContent(
    sxc,
    settings.useModuleList)
    .then(() => context.button.code(context));
}
