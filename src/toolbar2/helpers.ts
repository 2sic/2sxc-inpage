import { Commands } from "./command/commands";

/**
 * the toolbar manager is an internal helper
 * taking care of toolbars, buttons etc.
 */
// ToDo: refactor to avoid side-effects
export const defaultSettings = {
  autoAddMore: null, // null | "right" | "start" | true
  hover: 'right', // right | left | none
  show: 'hover', // always | hover
  // order or reverse, still thinking about this --> order: "default"    // default | reverse
};

/**
 * take any common input format and convert it to a full toolbar-structure definition
 * can handle the following input formats (the param unstructuredConfig):
 * complete tree (detected by "groups): { groups: [ {}, {}], name: ..., defaults: {...} }
 * group of buttons (detected by "buttons): { buttons: "..." | [], name: ..., ... }
 * list of buttons (detected by IsArray with action): [ { action: "..." | []}, { action: ""|[]} ]
 * button (detected by "command"): { command: ""|[], icon: "..", ... }
 * just a command (detected by "action"): { entityId: 17, action: "edit" }
 * array of commands: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
 * @param unstructuredConfig
 * @param allActions
 * @param instanceConfig
 * @param moreSettings
 */
export const buildFullDefinition = (unstructuredConfig, allActions: Commands, instanceConfig, moreSettings) => {
  const fullConfig = ensureDefinitionTree(unstructuredConfig, moreSettings);

  // ToDo: don't use console.log in production
  if (unstructuredConfig.debug) console.log('toolbar: detailed debug on; start build full Def');
  expandButtonGroups(fullConfig, allActions);
  removeDisableButtons(fullConfig, instanceConfig);
  if (fullConfig.debug) console.log('after remove: ', fullConfig);

  customize(fullConfig);

  return fullConfig;
};

//#region build initial toolbar object
/**
 * this will take an input which could already be a tree, but it could also be a
 * button-definition, or just a string, and make sure that afterwards it's a tree with groups
 * the groups could still be in compact form, or already expanded, depending on the input
 * output is object with:
 * - groups containing buttons[], but buttons could still be very flat
 * - defaults, already officially formatted
 * - params, officially formatted
 * @param original
 * @param moreSettings
 */
export const ensureDefinitionTree = (original, moreSettings) => {
  // original is null/undefined, just return empty set
  if (!original) throw (`preparing toolbar, with nothing to work on: ${original}`);

  // ensure that if it's just actions or buttons, they are then processed as arrays with 1 entry
  if (!Array.isArray(original) && (original.action || original.buttons)) original = [original];

  // ensure that arrays of actions or buttons are re-mapped to the right structure node
  if (Array.isArray(original) && original.length) {
    // an array of items having buttons, so it must be button-groups
    if (original[0].buttons)
      (original as any).groups = original; // move "down"
    // array of items having an action, so these are buttons
    else if (original[0].command || original[0].action)
      original = { groups: [{ buttons: original }] };
    else
      console.warn("toolbar tried to build toolbar but couldn't detect type of this:", original);
  }

  // build an object with this structure
  return {
    name: original.name || 'toolbar', // name, no real use
    debug: original.debug || false, // show more debug info
    groups: original.groups || [], // the groups of buttons
    defaults: original.defaults || {}, // the button defaults like icon, etc.
    params: original.params || {}, // these are the default command parameters
    settings: Object.assign({}, defaultSettings, original.settings, moreSettings) as any,
  };
};
//#endregion initial toolbar object

/**
 * this will traverse a groups-tree and expand each group
 * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
 * @param fullSet
 * @param actions
 */
export const expandButtonGroups = (fullSet, actions: Commands) => { // , itemSettings) {
  // by now we should have a structure, let's check/fix the buttons
  for (let g = 0; g < fullSet.groups.length; g++) {
    // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
    expandButtonList(fullSet.groups[g], fullSet.settings);
    // fix all the buttons
    const btns = fullSet.groups[g].buttons;
    if (Array.isArray(btns))
      for (let b = 0; b < btns.length; b++) {
        const btn = btns[b];
        if (!(actions.get(btn.command.action)))
          console.warn('warning: toolbar-button with unknown action-name:', btn.command.action);
        Object.assign(btn.command, fullSet.params); // enhance the button with settings for this instance
        // tools.addCommandParams(fullSet, btn);

        addDefaultBtnSettings(btn,
          fullSet.groups[g],
          fullSet,
          actions); // ensure all buttons have either own settings, or the fallback
      }
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
export const expandButtonList = (root, settings) => {
  // let root = grp; // the root object which has all params of the command
  let btns = [];
  let sharedProperties = null;

  // convert compact buttons (with multi-verb action objects) into own button-objects
  // important because an older syntax allowed {action: "new,edit", entityId: 17}
  if (Array.isArray(root.buttons)) {
    for (let b = 0; b < root.buttons.length; b++) {
      const btn = root.buttons[b];
      if (typeof btn.action === 'string' && btn.action.indexOf(',') > -1
      ) { // if btns. is neither array nor string, it's a short-hand with action names
        const acts = btn.action.split(',');
        for (let a = 0; a < acts.length; a++) {
          btns.push($.extend(true, {}, btn, { action: acts[a] }));
          console.log('stv1a#: ', btn);
        }
      } else
        btns.push(btn);
    }
  } else if (typeof root.buttons === 'string') {
    btns = root.buttons.split(',');
    sharedProperties = Object.assign({}, root); // inherit all fields used in the button
    console.log('stv1b#: ', btns);
    delete sharedProperties.buttons; // this one's not needed
    delete sharedProperties.name; // this one's not needed
    delete sharedProperties.action; //
  } else {
    btns = root.buttons;
    console.log('stv1c#: ', btns);
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
 * @param groups
 * @param actions
 */
export const addDefaultBtnSettings = (btn, group, groups, actions: Commands) => {
  for (let d = 0; d < btnProperties.length; d++)
    fallbackBtnSetting(btn, group, groups, actions, btnProperties[d]);
};

/**
 * configure missing button properties with various fallback options
 * @param btn
 * @param group
 * @param groups
 * @param actions
 * @param propName
 */
function fallbackBtnSetting(btn, group, groups, actions: Commands, propName) {
  btn[propName] = btn[propName] // by if already defined, use the already defined property
    ||
    (group.defaults && group.defaults[propName]) // if the group has defaults, try use that property
    ||
    (groups && groups.defaults && groups.defaults[propName]) // if the group has defaults, try use that property
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
