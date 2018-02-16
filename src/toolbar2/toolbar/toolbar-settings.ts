/** contains toolbar behaviour settings like float, etc. */
export class ToolbarSettings {
  autoAddMore: null | 'end' | 'start' | true = null; //  [true: used to be right/start]
  hover: 'right' | 'left' | 'none' = 'right';
  show: 'always' | 'hover' = 'hover';
}
