import { defaultToolbarTemplate } from './templates/default-toolbar-template';
import { leftToolbarTemplate } from './templates/left-toolbar-template';
import { ToolbarConfigTemplate } from './toolbar-config-template';

export class ToolbarConfigTemplates {
  configTemplateList: ToolbarConfigTemplate[] = [];
  list: HashTable<ToolbarConfigTemplate> = {}; // hash - table of templates, to be used a list()['template - name']

  constructor() {
    this.add('default', defaultToolbarTemplate);
    this.add('left', leftToolbarTemplate);
  }

  // a single template – usually 'default'
  get(name: string): ToolbarConfigTemplate {
    return this.list[name];
  }

  // adds a config to the list, if it doesn't exist
  add(name: string, template: ToolbarConfigTemplate, force?: boolean) {
    this.list[name] = template;
  }
}
