import { prepareToAddContent } from '../contentBlock/templates';
import { ContextOfButton } from '../context/context-of-button';
import { Commands } from '../toolbar2/command/commands';
import { commandOpenNgDialog } from './command-open-ng-dialog';
import { Settings } from './settings';

// ToDo: remove dead code
export function commandExecuteAction(context: ContextOfButton,
  nameOrSettings: any,
  eventOrSettings?: any,
  event?: any) {

  const sxc = context.sxc.sxc;
  const editContext = context.sxc.editContext;

  let settings: Settings = eventOrSettings;

  // cycle parameters, in case it was called with 2 params only
  if (!event && eventOrSettings && typeof eventOrSettings.altKey !== 'undefined'
  ) { // no event param, but settings contains the event-object
    event = eventOrSettings; // move it to the correct variable
    settings = {} as Settings; // clear the settings variable, as none was provided
  }

  // check if name is name (string) or object (settings)
  settings = (typeof nameOrSettings === 'string')
    ? Object.assign(settings || {},
      {
        action: nameOrSettings,
      }) // place the name as an action-name into a command-object
    : nameOrSettings;

  const conf = Commands.getInstance().get(settings.action).buttonConfig;

  settings = Object.assign({}, conf, settings) as Settings; // merge conf & settings, but settings has higher priority

  if (!settings.dialog
  ) settings.dialog = settings.action; // old code uses "action" as the parameter, now use verb ? dialog
  if (!settings.code)
    settings.code = (contextParam: ContextOfButton, settingsParam: Settings) => {
      return commandOpenNgDialog(contextParam, settingsParam);
    }; // decide what action to perform

  // pre-save event because afterwards we have a promise, so the event-object changes; funky syntax is because of browser differences
  const origEvent = event || window.event;

  if (conf.uiActionOnly) return settings.code(context, settings);

  // if more than just a UI-action, then it needs to be sure the content-group is created first
  return prepareToAddContent(sxc, settings.useModuleList)
    .then(() => settings.code(context, settings));
}
