import { CmdSpec } from '../../commands/cmd-spec';
import { Definition } from '../../commands/definition';
import { DataEditContext } from '../../data-edit-context/data-edit-context';
import { getButtonConfigDefaultsV1 } from '../button/expand-button-config';
import { CommandDefinition } from './command-definition';
// import all commands here to stop optimizers from excluding code that was not called form other module
import { Add } from './commands/add';
import { App } from './commands/app';
import { AppImport } from './commands/app-import';
import { AppResources } from './commands/app-resources';
import { AppSettings } from './commands/app-settings';
import { ContentItems } from './commands/content-items';
import { ContentType } from './commands/content-type';
import { Custom } from './commands/custom';
import { Delete } from './commands/delete';
import { Edit } from './commands/edit';
import { InstanceList } from './commands/instance-list';
import { ItemHistory } from './commands/item-history';
import { Layout } from './commands/layout';
import { Metadata } from './commands/metadata';
import { More } from './commands/more';
import { MoveDown } from './commands/movedown';
import { MoveUp } from './commands/moveup';
import { New } from './commands/new';
import { Publish } from './commands/publish';
import { Remove } from './commands/remove';
import { Replace } from './commands/replace';
import { TemplateDevelop } from './commands/template-develop';
import { TemplateQuery } from './commands/template-query';
import { TemplateSettings } from './commands/template-settings';
import { Zone } from './commands/zone';

export class Commands {

  private static instance: Commands;

  commandList: CommandDefinition[] = [];
  list: HashTable<CommandDefinition> = {}; // hash - table of action definitions, to be used a list()["action - name"]
  get = (name: string) => this.list[name]; // a specific action definition

  private constructor() { }

  static getInstance() {
    if (!Commands.instance) {
      Commands.instance = new Commands();
    }
    return Commands.instance;
  }

  public addDef = (def: CommandDefinition): void => {
    if (!this.list[def.name]) {
      // add
      // console.log('stv: add', def.name);
      this.commandList.push(def);
      this.list[def.name] = def;
    } else if (this.list[def.name] !== def) {
      // update
      // console.log('stv: update', def.name);
      this.list[def.name] = def;
    } else {
      // console.log('stv: !!!', def.name);
    }
  }
}
