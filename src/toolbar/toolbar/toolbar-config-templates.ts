import { defaultToolbarTemplate } from './templates/default-toolbar-template';
import { leftToolbarTemplate } from './templates/left-toolbar-template';
import { ToolbarConfigTemplate } from './toolbar-config-template';
import { HasLog } from '../../logging/has-log';
import { Log } from '../../logging/log';

export class ToolbarConfigTemplates extends HasLog {
  configTemplateList: ToolbarConfigTemplate[] = [];
  list: HashTable<ToolbarConfigTemplate> = {}; // hash - table of templates, to be used a list()['template - name']

  constructor(parentLog: Log) {
    super('Tlb.TmpMan', parentLog, "build");
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
