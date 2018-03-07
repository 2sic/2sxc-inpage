import { ContextOfButton } from '../../context/context-of-button';
import { ButtonAction } from '../button/button-action';
import { ButtonConfig } from '../button/button-config';
import { Commands } from '../command/commands';
import { Definition2 } from '../command/definition2';
import { ToolbarConfig } from '../toolbar/toolbar-config';
import { ToolbarSettings } from '../toolbar/toolbar-settings';
import { GroupConfig } from './group-config';

// export function ExpandButtonConfig(context, buttonConfig: ButtonConfig): ButtonConfig {
//  // todo

//  return buttonConfig;
//}

// takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
// ReSharper disable once UnusedParameter
export function expandButtonConfig(original: any, sharedProps: any[]) {
  // prevent multiple inits
  if (original._expanded || original.command)
    return original;

  // if just a name, turn into a command
  if (typeof original === 'string')
    original = { action: original };

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

export function getButtonConfigDefaultsV1(name: string, icon: string, translateKey: string, uiOnly: boolean, partOfPage: boolean, more: Definition2): Partial<ButtonConfig> {
  // stv: v1 code
  const partialButtonConfig = {
    icon: 'icon-sxc-' + icon,
    title: (context: ContextOfButton) => 'Toolbar.' + translateKey,
    uiActionOnly: uiOnly,
    partOfPage: partOfPage,
  } as Partial<ButtonConfig>;

  Object.assign(partialButtonConfig, more);

  return partialButtonConfig;
}

// remove buttons which are not valid based on add condition
export function removeDisableButtons(context, full: ToolbarConfig, config): void {
  const btnGroups = full.groups;
  for (let g = 0; g < btnGroups.length; g++) {
    const btns = btnGroups[g].buttons;
    removeUnfitButtons(context, btns, config);
    disableButtons(context, btns, config);

    // remove the group, if no buttons left, or only "more"
    // if (btns.length === 0 || (btns.length === 1 && btns[0].command.action === 'more'))
    if (btns.length === 0 || (btns.length === 1 && btns[0].action.name === 'more'))
      btnGroups.splice(g--, 1); // remove, and decrement counter
  }
}

function removeUnfitButtons(context, btns: ButtonConfig[], config): void {
  for (let i = 0; i < btns.length; i++) {
    // let add = btns[i].showCondition;
    // if (add !== undefined)
    //    if (typeof (add) === "function" ? !add(btns[i].command, config) : !add)
    // if (!evalPropOrFunction(btns[i].showCondition, btns[i].command, config, true))
    if (!evalPropOrFunction(btns[i].showCondition, context, btns[i].action.params, config, true))
      btns.splice(i--, 1);
  }
}

function disableButtons(context, btns: ButtonConfig[], config): void {
  for (let i = 0; i < btns.length; i++) {
    // btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
    btns[i].disabled = evalPropOrFunction(btns[i].disabled, context, btns[i].action.params, config, false);
  }
}

function evalPropOrFunction(propOrFunction: any, context: any, settings, config, fallback): any {
  if (propOrFunction === undefined || propOrFunction === null)
    return fallback;
  return typeof (propOrFunction) === 'function' ? propOrFunction(context, settings, config) : propOrFunction;
}

/**
 * enhance button-object with default icons, etc.
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 */
export function addDefaultBtnSettings(btn: ButtonConfig, group: GroupConfig, fullToolbarConfig: ToolbarConfig, actions: Commands) {
  for (let d = 0; d < btnProperties.length; d++)
    fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
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
function fallbackBtnSetting(btn: ButtonConfig, group: GroupConfig, fullToolbarConfig: ToolbarConfig, actions: Commands, propName: string): void {
  btn[propName] = btn[propName] // by if already defined, use the already defined property
    ||
    (group.defaults && group.defaults[propName]) // if the group has defaults, try use that property
    ||
    (fullToolbarConfig && fullToolbarConfig.defaults && fullToolbarConfig.defaults[propName]) // if the group has defaults, try use that property
    ||
    (actions.get(btn.action.name) &&
      actions.get(btn.action.name).buttonConfig &&
      actions.get(btn.action.name).buttonConfig[propName]); // if there is an action, try to use that property name
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
