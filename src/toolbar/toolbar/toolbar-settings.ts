import { ToolbarConfig } from '../toolbar-config';

/** contains toolbar behaviour settings like float, etc. */
export class ToolbarSettings {
  autoAddMore: null | 'start' | 'end' | true = null; //  [true: used to be right/start]
  hover: 'left' | 'right' | 'none' = 'right';
  show: 'always' | 'hover' = 'hover';
  classes: string = '';
  constructor(toolbarSettings?: Partial<ToolbarSettings>) {
    if (toolbarSettings) {
      Object.assign(this, toolbarSettings);
    }
  }
}

// ToDo: refactor to avoid side-effects
export const defaultToolbarSettings: ToolbarSettings = new ToolbarSettings({
  autoAddMore: null, // null | 'start' | 'end' | true
  hover: 'right', // 'left' |'right' | 'none'
  show: 'hover', // 'always' | 'hover'
  // order or reverse, still thinking about this --> order: "default"    // default | reverse
});

/** default / fallback settings for toolbars when nothings is specified */
export const settingsForEmptyToolbar: ToolbarSettings = new ToolbarSettings({
  autoAddMore: 'start', // ex: 'left'
  hover: 'left',
  show: 'hover',
});

export const emptyToolbar: ToolbarConfig = {
  toolbar: '',
  settings: settingsForEmptyToolbar,
} as ToolbarConfig;
