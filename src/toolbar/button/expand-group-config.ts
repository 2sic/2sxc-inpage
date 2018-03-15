import { Commands } from '../../commands/commands';
import { ButtonAction } from '../button/button-action';
import { ButtonConfig } from '../button/button-config';
import { ToolbarConfig } from '../toolbar/toolbar-config';
import { ToolbarSettings } from '../toolbar/toolbar-settings';
import { addDefaultBtnSettings, expandButtonConfig } from './expand-button-config';

/**
 * this will traverse a groups-tree and expand each group
 * so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
 * @param fullToolbarConfig
 */
export function expandButtonGroups(fullToolbarConfig: ToolbarConfig): void {

  const actions = Commands.getInstance();

  // by now we should have a structure, let's check/fix the buttons
  for (let g = 0; g < fullToolbarConfig.groups.length; g++) {
    // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
    expandButtonList(fullToolbarConfig.groups[g], fullToolbarConfig.settings);
    // fix all the buttons
    const btns = fullToolbarConfig.groups[g].buttons;

    const buttonConfigs: ButtonConfig[] = [];

    if (Array.isArray(btns)) {
      for (let b = 0; b < btns.length; b++) {
        const btn = btns[b] as any;
        if (!(actions.get(btn.command.action)))
          console.warn('warning: toolbar-button with unknown action-name:', btn.command.action);

        const name = btn.command.action;
        const contentType = btn.command.contentType;

        // parameters adapter from v1 to v2
        let params = parametersAdapter(btn.command);

        Object.assign(params, fullToolbarConfig.params);

        // Toolbar API v2
        const newButtonAction = new ButtonAction(name, contentType, params);
        newButtonAction.commandDefinition = actions.get(name);
        const newButtonConfig = new ButtonConfig(newButtonAction);
        newButtonConfig.name = name;

        addDefaultBtnSettings(newButtonConfig,
          fullToolbarConfig.groups[g],
          fullToolbarConfig,
          actions); // ensure all buttons have either own settings, or the fallback

        buttonConfigs.push(newButtonConfig);

      }
    }

    // Toolbar API v2 overwrite V1
    fullToolbarConfig.groups[g].buttons = buttonConfigs;
  }
}

function parametersAdapter(oldParameters: any): any {
  const newParams = oldParameters;
  // some clean-up
  delete newParams.action; // remove the action property
  return newParams;
}

/**
 * take a list of buttons (objects OR strings)
 * and convert to proper array of buttons with actions
 * on the in is a object with buttons, which are either:
 * - a string like "edit" or multi-value "layout,more"
 * - an array of such strings incl. optional complex objects which are
 * @param root
 * @param settings
 */
function expandButtonList(root: any, settings: ToolbarSettings): void {

  // let root = grp; // the root object which has all params of the command
  let btns: any[] = [];
  let sharedProperties: any = null;

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
        }
      } else {
        btns.push(btn);
      }
    }

  } else if (typeof root.buttons === 'string') {

    btns = root.buttons.split(',');

    sharedProperties = Object.assign({}, root); // inherit all fields used in the button
    delete sharedProperties.buttons; // this one's not needed
    delete sharedProperties.name; // this one's not needed
    delete sharedProperties.action; //

  } else {

    btns = root.buttons;

  }

  // optionally add a more-button in each group
  if (settings.autoAddMore) {
    if (settings.autoAddMore === 'end')
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
}
