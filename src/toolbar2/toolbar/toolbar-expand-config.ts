import { ToolbarConfig } from './toolbar-config';
import { ToolbarSettings } from './toolbar-settings';

export function ExpandToolbarConfig(context, partialConfig: ToolbarConfig): ToolbarConfig {
  // todo
  return partialConfig;
}

// todo, refactor
const defaultToolbarSettings: ToolbarSettings = {
  autoAddMore: null, // null | "right" | "start" | true
  hover: 'right', // right | left | none
  show: 'hover', // always | hover
  // order or reverse, still thinking about this --> order: "default"    // default | reverse
};

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
const ensureDefinitionTree = (original, toolbarSettings: ToolbarSettings): ToolbarConfig => {
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

  const toolbarConfig = new ToolbarConfig();
  toolbarConfig.items = original.groups || []; // the groups of buttons
  toolbarConfig.params = original.params || {}; // these are the default command parameters
  toolbarConfig.settings = Object.assign({}, defaultToolbarSettings, original.settings, toolbarSettings) as ToolbarSettings;

  // todo: old props, remove
  toolbarConfig.name = original.name || 'toolbar'; // name, no real use
  toolbarConfig.debug = original.debug || false; // show more debug info
  toolbarConfig.defaults = original.defaults || {}; // the button defaults like icon, etc.

  return toolbarConfig;
};
