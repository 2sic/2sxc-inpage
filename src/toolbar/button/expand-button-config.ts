import { Commands } from '../../commands/commands';
import { Definition } from '../../commands/definition';
import { Settings } from '../../commands/settings';
import { ContextOfButton } from '../../context/context-of-button';
import { ButtonConfig } from '../button/button-config';
import { ToolbarConfig } from '../toolbar/toolbar-config';
import { GroupConfig } from './group-config';

// takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
// ReSharper disable once UnusedParameter
export function expandButtonConfig(original: any, sharedProps: any[]) {
  // prevent multiple inits
  if (original._expanded || original.command) {
    return original;
  };

  // if just a name, turn into a command
  if (typeof original === 'string') {
    original = { action: original };
  };

  // if it's a command w/action, wrap into command + trim
  if (typeof original.action === 'string') {
    original.action = original.action.trim();
    original = { command: original };
  }
  // some clean-up
  delete original.action; // remove the action property
  original._expanded = true;

  return original;
}

export function getButtonConfigDefaultsV1(name: string,
                                          icon: string,
                                          translateKey: string,
                                          uiOnly: boolean,
                                          partOfPage: boolean,
                                          more: Definition): Partial<ButtonConfig> {
  // stv: v1 code
  const partialButtonConfig = {
    icon: `icon-sxc-${icon}`,
    title: (context: ContextOfButton) => `Toolbar.${translateKey}`,
    uiActionOnly: uiOnly,
    partOfPage: partOfPage,
  } as Partial<ButtonConfig>;

  Object.assign(partialButtonConfig, more);

  return partialButtonConfig;
}

// remove buttons which are not valid based on add condition
export function removeDisableButtons(context: any, full: ToolbarConfig): void {
  const btnGroups = full.groups;
  for (let g = 0; g < btnGroups.length; g++) {
    const btns = btnGroups[g].buttons;
    removeUnfitButtons(context, btns);
    disableButtons(context, btns);

    // remove the group, if no buttons left, or only "more"
    // if (btns.length === 0 || (btns.length === 1 && btns[0].command.action === 'more'))
    if (btns.length === 0 || (btns.length === 1 && btns[0].action.name === 'more')) {
      btnGroups.splice(g--, 1);
    } // remove, and decrement counter
  }
}

function removeUnfitButtons(context: ContextOfButton, btns: ButtonConfig[]): void {
  for (let i = 0; i < btns.length; i++) {
    // let add = btns[i].showCondition;
    // if (add !== undefined)
    //    if (typeof (add) === "function" ? !add(btns[i].command, config) : !add)
    // if (!evalPropOrFunction(btns[i].showCondition, btns[i].command, config, true))
    if (btns[i].action && !evalPropOrFunction(btns[i].showCondition, context, btns[i].action.params, true)) {
      btns.splice(i--, 1);
    }
  }
}

function disableButtons(context: ContextOfButton, btns: ButtonConfig[]): void {
  for (let i = 0; i < btns.length; i++) {
    // btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
    if (btns[i].action) {
      btns[i].disabled = evalPropOrFunction(
        btns[i].disabled,
        context,
        btns[i].action.params,
        false);
    } else {
      btns[i].disabled = ((context: ContextOfButton, settings: Settings) => false);
    }

  }
}

function evalPropOrFunction(propOrFunction: any, context: ContextOfButton, settings: any, fallback: any): any {
  if (propOrFunction === undefined || propOrFunction === null) {
    return fallback;
  }
  if (typeof (propOrFunction) === 'function') {
    return propOrFunction(context, settings);
  } else {
    return propOrFunction;
  }
}

/**
 * enhance button-object with default icons, etc.
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 */
export function addDefaultBtnSettings(btn: ButtonConfig,
                                      group: GroupConfig,
                                      fullToolbarConfig: ToolbarConfig,
                                      actions: Commands) {
  for (let d = 0; d < btnProperties.length; d++) {
    fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
  }
}

const btnProperties = [
  'classes',
  'icon',
  'title',
  'dynamicClasses',
  'showCondition',
  'disabled'
];

const prvProperties = [
  'defaults',
  'params',
  'name'
];

/**
 * configure missing button properties with various fallback options
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 * @param propName
 */
function fallbackBtnSetting(btn: ButtonConfig,
                            group: GroupConfig,
                            fullToolbarConfig: ToolbarConfig,
                            actions: Commands,
                            propName: string): void {
  if (btn[propName]) {

    // if already defined, use the already defined property
    btn[propName] = btn[propName];

  } else if (group.defaults &&
    group.defaults[propName]) {

    // if the group has defaults, try use that property
    btn[propName] = group.defaults[propName];

  } else if (fullToolbarConfig &&
    fullToolbarConfig.defaults &&
    fullToolbarConfig.defaults[propName]) {

    // if the toolbar has defaults, try use that property
    btn[propName] = fullToolbarConfig.defaults[propName];

  } else if (btn.action &&
    btn.action.name &&
    actions.get(btn.action.name) &&
    actions.get(btn.action.name).buttonConfig &&
    actions.get(btn.action.name).buttonConfig[propName]) {

    // if there is an action, try to use that property name
    btn[propName] = actions.get(btn.action.name).buttonConfig[propName];

  }
}

// ReSharper disable once UnusedParameter
export function customize(toolbar: ToolbarConfig): void {
  // if (!toolbar.settings) return;
  // let set = toolbar.settings;
  // if (set.autoAddMore) {
  //    console.log("auto-more");
  //    let grps = toolbar.groups;
  //    for (let g = 0; g < grps.length; g++) {
  //        let btns = grps[g];
  //        for (let i = 0; i < btns.length; i++) {
  //        }
  //    }
  // }
}
