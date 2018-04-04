import { ToolbarSettings } from './toolbar-settings';

export class ToolbarConfigTemplate {
  groups: item[] = [];
  defaults?: HashTable<string> = {};
  params?: HashTable<string> = {};
  settings?: Partial<ToolbarSettings> = {};
}

class item {
  name: string;
  buttons: string;
  defaults?: HashTable<string> = {};
}
