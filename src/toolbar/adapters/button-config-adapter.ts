import { Commands } from "../../commands/commands";
import { Settings } from "../../commands/settings";
import { ContextOfButton } from "../../context/context-of-button";
import { ButtonAction } from '../button/button-action';
import { ButtonDefinition } from '../button/button-definition';
import { ButtonConfig } from '../button/button-config';
import { expandButtonConfig } from '../button/expand-button-config';
import { ModConfig } from '../button/mod-config';
import { parametersAdapter } from './parameters-adapter';

export function buttonConfigAdapter(context: ContextOfButton, actDef: ButtonDefinition, groupIndex: number): ButtonConfig {

  const partialButtonConfig: Partial<ButtonConfig> = {};

  if (actDef.title) {
    partialButtonConfig.title = (context: ContextOfButton) => `Toolbar.${actDef.title}`;
  }

  if (actDef.icon) {
    partialButtonConfig.icon = `icon-sxc-${actDef.icon}`;
  }

  if (actDef.classes) {
    partialButtonConfig.classes = actDef.classes;
  }

  if (actDef.dynamicClasses) {
    partialButtonConfig.dynamicClasses = (context: ContextOfButton, settings: Settings) => {
      return actDef.dynamicClasses(settings);
    }
  }

  if (actDef.showCondition) {
    partialButtonConfig.showCondition = (context: ContextOfButton) => {
      const modConfig = new ModConfig();

      // todo: stv .. .find this data
      //modConfig.target = ''; // todo
      //modConfig.isList = false; // todo

      return actDef.showCondition(context.button.action.params, modConfig);
    }
  }

  if (actDef.disabled) {
    partialButtonConfig.disabled = (context: ContextOfButton, settings: Settings) => {
      return actDef.disabled;
    }
  }

  if (actDef.params) {
    // todo: stv ... test this...
    Object.assign(partialButtonConfig.params, actDef.params);
  }

  if (actDef.uiActionOnly) {
    partialButtonConfig.uiActionOnly = actDef.uiActionOnly;
  }

  if (actDef.code) {
    partialButtonConfig.code = (context: ContextOfButton) => {

      const modConfig = new ModConfig();
      // todo: stv .. .find this data
      //modConfig.target = ''; // todo
      //modConfig.isList = false; // todo

      return actDef.code(context.button.action.params, modConfig);
    }

  }

  if (actDef.name) {
    partialButtonConfig.name = actDef.name;
  }

  if (actDef.dialog) {
    partialButtonConfig.dialog = actDef.dialog;
  }

  if (actDef.newWindow) {
    partialButtonConfig.newWindow = actDef.newWindow;
  }

  if (actDef.inlineWindow) {
    partialButtonConfig.inlineWindow = actDef.inlineWindow;
  }

  if (actDef.fullScreen) {
    partialButtonConfig.fullScreen = actDef.fullScreen;
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
