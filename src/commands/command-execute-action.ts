import { prepareToAddContent } from '../contentBlock/templates';
import { ContextOfButton } from '../context/context-of-button';
import { commandOpenNgDialog } from './command-open-ng-dialog';
import { Commands } from './commands';
import { Settings } from './settings';
import { ButtonAction } from '../toolbar/button/button-action';
import { ButtonConfig } from '../toolbar/button/button-config';
import { settingsAdapter } from '../toolbar/adapters/settings-adapter';
import { Log } from '../logging/log';
import { HasLog } from '../logging/has-log';

// ToDo: remove dead code

export function runDynamic(
  context: ContextOfButton,
  nameOrSettings: string | Partial<Settings>,
  eventOrSettings: Partial<Settings> | Event,
  event?: Event) {

  const log = new Log('Cmd.Run', null, 'start');

  let settings: Partial<Settings>;

  const thirdParamIsEvent = (!event && eventOrSettings && typeof (eventOrSettings as MouseEvent).altKey !== 'undefined');
  log.add(`might cycle parameters, in case not all were given. args count=${arguments.length}, third is event=${thirdParamIsEvent}`);
  if (thirdParamIsEvent) { // no event param, but settings contains the event-object
    log.add('cycling parameters as event was missing & eventOrSettings seems to be an event; settings must be empty');
    event = eventOrSettings as Event; // move it to the correct variable
    settings = (nameOrSettings || {}) as Partial<Settings>; 
  } else
    settings = (eventOrSettings || {}) as Partial<Settings>;

  // ensure we have the right event despite browser differences
  event = event || window.event;

  return new Engine2(log).run(context, settings, event);
  
}


export class Engine2 extends HasLog {

  constructor(parentLog?: Log) {
    super('Cmd.Exec', parentLog);
  }


  /**
   * run a command 
   * this method expects a clear order of parameters
   * @param context
   * @param settings
   * @param event
   */
  run(
    context: ContextOfButton,
    settings: string | Partial<Settings>,
    event: Event) {

    settings = this.expandSettingsWithDefaults(settings);

    const origEvent = event;
    const name = settings.action;
    const contentType = settings.contentType;
    this.log.add(`run command ${name} for type ${contentType}`);

    // Toolbar API v2
    const newButtonAction = new ButtonAction(name, contentType, settings);
    newButtonAction.commandDefinition = Commands.getInstance().get(name);
    const newButtonConfig = new ButtonConfig(newButtonAction);
    newButtonConfig.name = name;

    const button = context.button = Object.assign(newButtonConfig,
      newButtonAction.commandDefinition.buttonConfig,
      settingsAdapter(settings)) as ButtonConfig; // merge conf & settings, but settings has higher priority

    // todo: stv, fix this in case that is function
    if (!button.dialog) {
      this.log.add(`button.dialog method missing, must be old implementation which used the action-name - generating method`);
      button.dialog = () => { return name; };
    }

    // todo: stv, fix this in case that is function
    if (!button.code) {
      this.log.add(`simple button without code - generating code to open standard dialog`);
      button.code = (contextParam: ContextOfButton, event: Event) => {
        return commandOpenNgDialog(contextParam, event);
      };
    }

    if (button.uiActionOnly(context)) {
      this.log.add(`just a UI command, will not run pre-flight to ensure content-block - now running the code`);
      return button.code(context, origEvent);
    }

    // if more than just a UI-action, then it needs to be sure the content-group is created first
    this.log.add(`command might change data, will wrap in pre-flight to ensure content-block`);
    const prepare = prepareToAddContent(context, settings.useModuleList)
      .then(() => {
        context.button.code(context, origEvent);
      });

    return prepare;

  }




  /**
   * Take a settings-name or partial settings object, 
   * and return a full settings object with all defaults from 
   * the command definition
   * @param log
   * @param settings
   * @param nameOrSettings
   */
  expandSettingsWithDefaults(nameOrSettings: string | Partial<Settings>): Settings {
    const nameIsString = typeof nameOrSettings === 'string';
    this.log.add(`expanding settings; name is string: ${nameIsString}; name = ${nameOrSettings}`);

    // check if name is name (string) or object (settings)
    const settings = (nameIsString
      ? Object.assign(nameOrSettings || {},
        { action: nameOrSettings }) // place the name as an action-name into a command-object
      : nameOrSettings) as Partial<Settings>;

    const name = settings.action;
    this.log.add(`will add defaults for ${name} from buttonConfig`);
    const conf = Commands.getInstance().get(name).buttonConfig;
    const full = Object.assign({}, conf, settings) as Settings; // merge conf & settings, but settings has higher priority

    return full;
  }
  
}

