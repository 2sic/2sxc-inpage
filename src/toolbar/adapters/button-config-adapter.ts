import { Commands } from '../../commands/commands';
import { ContextOfButton } from '../../context/context-of-button';
import { ButtonAction } from '../button/button-action';
import { ButtonDefinition } from '../button/button-definition';
import { ButtonConfig } from '../button/button-config';
import { expandButtonConfig } from '../button/expand-button-config';
import { ModConfig } from '../button/mod-config';
import { parametersAdapter } from './parameters-adapter';

export function buttonConfigAdapter(context: ContextOfButton, actDef: ButtonDefinition, groupIndex: number): ButtonConfig {

  const partialButtonConfig: Partial<ButtonConfig> = {};

  if (actDef.code) {
    partialButtonConfig.code = (context: ContextOfButton) => {

      const modConfig = new ModConfig();
      // todo: stv find this data
      // modConfig.target = '';
      // modConfig.isList = false;

      return actDef.code(context.button.action.params, modConfig);
    }
  }

  if (actDef.icon) {
    partialButtonConfig.icon = (context: ContextOfButton) => {
      return `icon-sxc-${actDef.icon}`;
    }
  }

  if (actDef.classes) {
    partialButtonConfig.classes = actDef.classes;
  }

  if (actDef.dialog) {
    partialButtonConfig.dialog = (context: ContextOfButton) => {
      return actDef.dialog;
    };
  }

  if (actDef.disabled) {
    partialButtonConfig.disabled = (context: ContextOfButton) => {
      return actDef.disabled;
    }
  }

  if (actDef.dynamicClasses) {
    partialButtonConfig.dynamicClasses = (context: ContextOfButton) => {
      return actDef.dynamicClasses(context.button.action.params);
    }
  }

  if (actDef.fullScreen) {
    partialButtonConfig.fullScreen = (context: ContextOfButton) => {
      return actDef.fullScreen;
    }
  }

  if (actDef.inlineWindow) {
    partialButtonConfig.inlineWindow = (context: ContextOfButton) => {
      return actDef.inlineWindow;
    }
  }

  if (actDef.name) {
    partialButtonConfig.name = actDef.name;
  }

  if (actDef.newWindow) {
    partialButtonConfig.newWindow = (context: ContextOfButton) => {
      return actDef.newWindow;
    }
  }

  if (actDef.params) {
    // todo: stv, this do not looking good, because old simple parameters become methods with context as parameter,
    // we need parameter adapter to do this...
    Object.assign(partialButtonConfig.params, actDef.params);
  }

  if (actDef.partOfPage) {
    partialButtonConfig.partOfPage = (context: ContextOfButton) => {
      return actDef.partOfPage;
    }
  }

  if (actDef.showCondition) {
    partialButtonConfig.showCondition = (context: ContextOfButton) => {
      const modConfig = new ModConfig();

      // todo: stv find this data
      // modConfig.target = '';
      // modConfig.isList = false;

      return actDef.showCondition(context.button.action.params, modConfig);
    }
  }

  if (actDef.title) {
    partialButtonConfig.title = (context: ContextOfButton) => {
      return `Toolbar.${actDef.title}`;
    }
  }

  if (actDef.uiActionOnly) {
    partialButtonConfig.uiActionOnly = (context: ContextOfButton) => {
      return actDef.uiActionOnly;
    }
  }

  actDef = (expandButtonConfig(actDef, [], null)) as ButtonDefinition;

  const name = actDef.command.action;
  const contentType = actDef.command.contentType;

  // parameters adapter from v1 to v2
  const params = parametersAdapter(actDef.command);

  // Toolbar API v2
  const actions = Commands.getInstance();
  const newButtonAction = new ButtonAction(name, contentType, params);
  newButtonAction.commandDefinition = actions.get(name);
  const newButtonConfig = new ButtonConfig(newButtonAction);
  newButtonConfig.name = name;

  return newButtonConfig;
}
