import { DataEditContext } from '../../data-edit-context/data-edit-context';
import { InstanceConfig } from '../../manage/instance-config';
import { customize, removeDisableButtons } from '../button/expand-button-config';
import { expandButtonGroups } from '../button/expand-group-config';
import { ToolbarConfig } from './toolbar-config';
import { defaultToolbarSettings, settingsForEmptyToolbar, ToolbarSettings } from './toolbar-settings';
import { toolbarStandardButtons } from './toolbar-standard-buttons';

export function ExpandToolbarConfig(context: any, toolbarData: any, toolbarSettings: ToolbarSettings): ToolbarConfig {
  const editContext: DataEditContext = context.sxc.editContext;

  if (toolbarData === {} && toolbarSettings === ({} as ToolbarSettings))
    toolbarSettings = settingsForEmptyToolbar;

  // if it has an action or is an array, keep that. Otherwise get standard buttons
  toolbarData = toolbarData || {}; // if null/undefined, use empty object

  let unstructuredConfig = toolbarData;
  if (!toolbarData.action && !toolbarData.groups && !toolbarData.buttons && !Array.isArray(toolbarData))
    unstructuredConfig = toolbarStandardButtons(editContext.User.CanDesign, toolbarData);

  const instanceConfig = new InstanceConfig(editContext);

  // whatever we had, if more settings were provided, override with these...
  const config = buildFullDefinition(context, unstructuredConfig, instanceConfig, toolbarSettings);

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
const buildFullDefinition =
  (context: any, unstructuredConfig: any, instanceConfig: any, toolbarSettings: ToolbarSettings) => {

    const fullConfig = ensureDefinitionTree(unstructuredConfig, toolbarSettings);

    // ToDo: don't use console.log in production
    if (unstructuredConfig.debug) console.log('toolbar: detailed debug on; start build full Def');

    expandButtonGroups(fullConfig);

    removeDisableButtons(context, fullConfig, instanceConfig);

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
 * @param unstructuredConfig
 * @param toolbarSettings
 */
const ensureDefinitionTree = (unstructuredConfig: any, toolbarSettings: ToolbarSettings): ToolbarConfig => {
  // original is null/undefined, just return empty set
  if (!unstructuredConfig) throw (`preparing toolbar, with nothing to work on: ${unstructuredConfig}`);

  // ensure that if it's just actions or buttons, they are then processed as arrays with 1 entry
  if (!Array.isArray(unstructuredConfig) && (unstructuredConfig.action || unstructuredConfig.buttons))
    unstructuredConfig = [unstructuredConfig];

  // ensure that arrays of actions or buttons are re-mapped to the right structure node
  if (Array.isArray(unstructuredConfig) && unstructuredConfig.length) {
    if (unstructuredConfig[0].buttons) {
      // an array of items having buttons, so it must be button-groups
      (unstructuredConfig as any).groups = unstructuredConfig; // move "down"
    } else if (unstructuredConfig[0].command || unstructuredConfig[0].action) {
      // array of items having an action, so these are buttons
      unstructuredConfig = { groups: [{ buttons: unstructuredConfig }] };
    } else {
      console.warn("toolbar tried to build toolbar but couldn't detect type of this:", unstructuredConfig);
    }
  }

  const toolbarConfig = new ToolbarConfig();
  // toolbarConfig.groupConfig = new GroupConfig(original.groups as ButtonConfig[]);
  toolbarConfig.groups = unstructuredConfig.groups || []; // the groups of buttons
  toolbarConfig.params = unstructuredConfig.params || {}; // these are the default command parameters
  toolbarConfig.settings =
    Object.assign({}, defaultToolbarSettings, unstructuredConfig.settings, toolbarSettings) as ToolbarSettings;

  // todo: old props, remove
  toolbarConfig.name = unstructuredConfig.name || 'toolbar'; // name, no real use
  toolbarConfig.debug = unstructuredConfig.debug || false; // show more debug info
  toolbarConfig.defaults = unstructuredConfig.defaults || {}; // the button defaults like icon, etc.

  return toolbarConfig;
};
//#endregion initial toolbar object
