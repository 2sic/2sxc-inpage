import { ToolbarConfigTemplate } from './config-template';

export class ToolbarConfigTemplates {
  configTemplateList: ToolbarConfigTemplate[];
  list: () => {}; // hash - table of templates, to be used a list()['template - name']
  get: (name: string) => {}; // a single template – usually 'default'
  add: (name: string, template: ToolbarConfigTemplate, force?: boolean) => {}; // adds a config to the list, if it doesn't exist
}
