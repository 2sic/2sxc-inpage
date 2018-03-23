/** contains toolbar behaviour settings like float, etc. */
export class ToolbarSettings {
  autoAddMore?: null | 'end' | 'start' | true = null; //  [true: used to be right/start]
  hover?: 'right' | 'left' | 'none' = 'right';
  show?: 'always' | 'hover' = 'hover';
  classes?: string;
}

// ToDo: refactor to avoid side-effects
export const defaultToolbarSettings: ToolbarSettings = {
  autoAddMore: null, // null | "end" | "start" | true
  hover: 'right', // right | left | none
  show: 'hover', // always | hover
  // order or reverse, still thinking about this --> order: "default"    // default | reverse
};

/** default / fallback settings for toolbars when nothings is specified */
export const settingsForEmptyToolbar: ToolbarSettings = {
  autoAddMore: 'end', // ex: 'left'
  hover: 'left',
  show: 'hover',
};
