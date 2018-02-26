import { DataEditContext } from '../../data-edit-context/data-edit-context';
import { InstanceConfig } from '../../manage/instance-config';
import { ButtonConfig } from '../button/button-config';
import { GroupConfig } from '../button/group-config';
import { Commands } from '../command/commands';
import * as buttonHelpers from '../helpers';
import { standardButtons } from '../standard-buttons';
import { ToolbarConfig } from './toolbar-config';
import { defaultToolbarSettings, settingsForEmptyToolbar, ToolbarSettings } from './toolbar-settings';

export function ExpandToolbarConfig(editContext: DataEditContext, allActions: Commands, toolbarData: any, toolbarSettings: ToolbarSettings): ToolbarConfig {

  if (toolbarData === {} && toolbarSettings === ({} as ToolbarSettings))
    toolbarSettings = settingsForEmptyToolbar;

  // if it has an action or is an array, keep that. Otherwise get standard buttons
  toolbarData = toolbarData || {}; // if null/undefined, use empty object

  let unstructuredConfig = toolbarData;
  if (!toolbarData.action && !toolbarData.groups && !toolbarData.buttons && !Array.isArray(toolbarData))
    unstructuredConfig = standardButtons(editContext.User.CanDesign, toolbarData);

  const instanceConfig: InstanceConfig = new InstanceConfig(editContext);

  // whatever we had, if more settings were provided, override with these...
  const config = buildFullDefinition(unstructuredConfig, allActions, instanceConfig, toolbarSettings);
  return config;
}

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
 * @param toolbarSettings
 */
export const buildFullDefinition = (unstructuredConfig, allActions: Commands, instanceConfig, toolbarSettings: ToolbarSettings) => {

  const fullConfig = ensureDefinitionTree(unstructuredConfig, toolbarSettings);

  // ToDo: don't use console.log in production
  if (unstructuredConfig.debug) console.log('toolbar: detailed debug on; start build full Def');

  buttonHelpers.expandButtonGroups(fullConfig, allActions);

  buttonHelpers.removeDisableButtons(fullConfig, instanceConfig);

  if (fullConfig.debug) console.log('after remove: ', fullConfig);

  buttonHelpers.customize(fullConfig);

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
 * @param toolbarSettings
 */
export const ensureDefinitionTree = (original, toolbarSettings: ToolbarSettings): ToolbarConfig => {
  // original is null/undefined, just return empty set
  if (!original) throw (`preparing toolbar, with nothing to work on: ${original}`);

  // ensure that if it's just actions or buttons, they are then processed as arrays with 1 entry
  if (!Array.isArray(original) && (original.action || original.buttons)) original = [original];

  // ensure that arrays of actions or buttons are re-mapped to the right structure node
  if (Array.isArray(original) && original.length) {
    if (original[0].buttons) {
      // an array of items having buttons, so it must be button-groups
      (original as any).groups = original; // move "down"
    } else if (original[0].command || original[0].action) {
      // array of items having an action, so these are buttons
      original = { groups: [{ buttons: original }] };
    } else {
      console.warn("toolbar tried to build toolbar but couldn't detect type of this:", original);
    }
  }

  const toolbarConfig = new ToolbarConfig();
  // toolbarConfig.groupConfig = new GroupConfig(original.groups as ButtonConfig[]);
  toolbarConfig.groups = original.groups || []; // the groups of buttons
  toolbarConfig.params = original.params || {}; // these are the default command parameters
  toolbarConfig.settings = Object.assign({}, defaultToolbarSettings, original.settings, toolbarSettings) as ToolbarSettings;

  // todo: old props, remove
  toolbarConfig.name = original.name || 'toolbar'; // name, no real use
  toolbarConfig.debug = original.debug || false; // show more debug info
  toolbarConfig.defaults = original.defaults || {}; // the button defaults like icon, etc.

  console.log('stv: toolbarConfig ', toolbarConfig);

  return toolbarConfig;
};
//#endregion initial toolbar object
