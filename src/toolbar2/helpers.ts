import { ButtonConfig } from './button/button-config';
import { GroupConfig } from './button/group-config';
import { Commands } from './command/commands';
import { ToolbarConfig } from './toolbar/toolbar-config';
import { ToolbarSettings } from './toolbar/toolbar-settings';
import * as Buttonaction from './button/button-action';
import ButtonAction = Buttonaction.ButtonAction;
import { CommandDefinition } from './command/command-definition';
import { GetButtonConfigDefaultsV1 } from './button/expand-button-config';

/**
 * the toolbar manager is an internal helper
 * taking care of toolbars, buttons etc.
 */

/**
 * this will traverse a groups-tree and expand each group
 * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
 * @param fullToolbarConfig
 * @param actions
 */
export const expandButtonGroups = (fullToolbarConfig: ToolbarConfig, actions: Commands) => { // , itemSettings) {
  // by now we should have a structure, let's check/fix the buttons
  for (let g = 0; g < fullToolbarConfig.groups.length; g++) {
    // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
    expandButtonList(fullToolbarConfig.groups[g], fullToolbarConfig.settings, actions);
    // fix all the buttons

    const btns = fullToolbarConfig.groups[g].buttons;

    const buttonConfigs: ButtonConfig[] = [];

    if (Array.isArray(btns)) {
      for (let b = 0; b < btns.length; b++) {
        const btn = btns[b] as any;
        if (!(actions.get(btn.command.action)))
          console.warn('warning: toolbar-button with unknown action-name:', btn.command.action);
        Object.assign(btn.command, fullToolbarConfig.params); // enhance the button with settings for this instance
        // tools.addCommandParams(fullSet, btn);

        addDefaultBtnSettings(btn,
          fullToolbarConfig.groups[g],
          fullToolbarConfig,
          actions); // ensure all buttons have either own settings, or the fallback

        const name = btn.command.action;
        const newButtonAction = new ButtonAction(name, fullToolbarConfig.params);
        newButtonAction.commandDefinition = actions.get(name);
        const newButtonConfig = new ButtonConfig(newButtonAction);
        buttonConfigs.push(newButtonConfig);

      }
    }

    // console.log('stv: btns', JSON.stringify(btns));
    // console.log('stv: buttonConfigs', JSON.stringify(buttonConfigs));

    // fullToolbarConfig.groups[g].buttons = buttonConfigs;
  }
};

/**
 * take a list of buttons (objects OR strings)
 * and convert to proper array of buttons with actions
 * on the in is a object with buttons, which are either:
 * - a string like "edit" or multi-value "layout,more"
 * - an array of such strings incl. optional complex objects which are
 * @param root
 * @param settings
 */
export const expandButtonList = (root, settings: ToolbarSettings, actions: Commands) => {

  // let root = grp; // the root object which has all params of the command
  let btns = [];
  let sharedProperties = null;

  // convert compact buttons (with multi-verb action objects) into own button-objects
  // important because an older syntax allowed {action: "new,edit", entityId: 17}
  if (Array.isArray(root.buttons)) {

    for (let b = 0; b < root.buttons.length; b++) {
      const btn = root.buttons[b];
      if (typeof btn.action === 'string' && btn.action.indexOf(',') > -1) {
        // if btns. is neither array nor string, it's a short-hand with action names
        const acts = btn.action.split(',');
        for (let a = 0; a < acts.length; a++) {

          btns.push($.extend(true, {}, btn, { action: acts[a] }));
          // console.log('stv: btn', JSON.stringify(btn));
        }
      } else {
        btns.push(btn);
      }
    }
   // console.log('stv: btns #1', btns);

  } else if (typeof root.buttons === 'string') {

    btns = root.buttons.split(',');

    sharedProperties = Object.assign({}, root); // inherit all fields used in the button
    delete sharedProperties.buttons; // this one's not needed
    delete sharedProperties.name; // this one's not needed
    delete sharedProperties.action; //

    //console.log('stv: btns #2', btns);

  } else {

    btns = root.buttons;

    //console.log('stv: btns #3', btns);

  }

  // optionally add a more-button in each group
  if (settings.autoAddMore) {
    if (settings.autoAddMore === 'right')
      btns.push('more');
    else {
      btns.unshift('more');
    }
  }

  // add each button - check if it's already an object or just the string
  for (let v = 0; v < btns.length; v++) {
    btns[v] = expandButtonConfig(btns[v], sharedProperties);
    // todo: refactor this out, not needed any more as they are all together now
    // btns[v].group = root;// grp;    // attach group reference, needed for fallback etc.

  }

  // console.log('stv: btns', JSON.stringify(btns));

  root.buttons = btns; // ensure the internal def is also an array now
};

// takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
export const expandButtonConfig = (original, sharedProps) => {
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
};

// remove buttons which are not valid based on add condition
export const removeDisableButtons = (full, config) => {
  const btnGroups = full.groups;
  for (let g = 0; g < btnGroups.length; g++) {
    const btns = btnGroups[g].buttons;
    removeUnfitButtons(btns, config);
    disableButtons(btns, config);

    // remove the group, if no buttons left, or only "more"
    if (btns.length === 0 || (btns.length === 1 && btns[0].command.action === 'more'))
      btnGroups.splice(g--, 1); // remove, and decrement counter
  }
};

export function removeUnfitButtons(btns, config) {
  for (let i = 0; i < btns.length; i++) {
    // let add = btns[i].showCondition;
    // if (add !== undefined)
    //    if (typeof (add) === "function" ? !add(btns[i].command, config) : !add)
    if (!evalPropOrFunction(btns[i].showCondition, btns[i].command, config, true))
      btns.splice(i--, 1);
  }
}

export function disableButtons(btns, config) {
  for (let i = 0; i < btns.length; i++)
    btns[i].disabled = evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
}

export const btnProperties = [
  'classes',
  'icon',
  'title',
  'dynamicClasses',
  'showCondition',
  'disabled'
];

export const prvProperties = [
  'defaults',
  'params',
  'name'
];

/**
 * enhance button-object with default icons, etc.
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 */
export const addDefaultBtnSettings = (btn, group, fullToolbarConfig: ToolbarConfig, actions: Commands) => {
  for (let d = 0; d < btnProperties.length; d++)
    fallbackBtnSetting(btn, group, fullToolbarConfig, actions, btnProperties[d]);
};

/**
 * configure missing button properties with various fallback options
 * @param btn
 * @param group
 * @param fullToolbarConfig
 * @param actions
 * @param propName
 */
function fallbackBtnSetting(btn, group, fullToolbarConfig: ToolbarConfig, actions: Commands, propName) {
  btn[propName] = btn[propName] // by if already defined, use the already defined property
    ||
    (group.defaults && group.defaults[propName]) // if the group has defaults, try use that property
    ||
    (fullToolbarConfig && fullToolbarConfig.defaults && fullToolbarConfig.defaults[propName]) // if the group has defaults, try use that property
    ||
    (actions.get(btn.command.action) &&
      actions.get(btn.command.action).buttonConfig &&
      actions.get(btn.command.action).buttonConfig[propName]); // if there is an action, try to use that property name
}

export const customize = (toolbar) => {
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
};

export const evalPropOrFunction = (propOrFunction, settings, config, fallback) => {
  if (propOrFunction === undefined || propOrFunction === null)
    return fallback;
  return typeof (propOrFunction) === 'function' ? propOrFunction(settings, config) : propOrFunction;
};
