import { CmdSpec } from '../../commands/cmd-spec';
import { Definition } from '../../commands/definition';
import { DataEditContext } from '../../data-edit-context/data-edit-context';
import { getButtonConfigDefaultsV1 } from '../button/expand-button-config';
import { CommandDefinition } from './command-definition';
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

  commandList: CommandDefinition[] = [];
  list: HashTable<CommandDefinition> = {}; // hash - table of action definitions, to be used a list()["action - name"]
  get = (name: string) => this.list[name]; // a specific action definition

  constructor(private editContext: DataEditContext) {

    const cmdSpec: CmdSpec = {
      canDesign: editContext.User.CanDesign,
      templateId: editContext.ContentGroup.TemplateId,
      contentTypeId: editContext.ContentGroup.ContentTypeName,
      isContent: editContext.ContentGroup.IsContent,
      queryId: editContext.ContentGroup.QueryId,
      appResourcesId: editContext.ContentGroup.AppResourcesId,
      appSettingsId: editContext.ContentGroup.AppSettingsId,
      allowPublish: editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed,
    } as CmdSpec;

    this.create(cmdSpec);

    // console.log('stv: command', this);
  }

  private addDef = (def: CommandDefinition): void => {
    this.commandList.push(def);
    this.list[def.name] = def;
  }

  // quick helper so we can better debug the creation of definitions
  private makeDef = (name: string, translateKey: string, icon: string, uiOnly: boolean, partOfPage: boolean, more: Definition): CommandDefinition => {
    if (typeof (partOfPage) !== 'boolean')
      throw 'partOfPage in commands not provided, order will be wrong!';

    // Toolbar API v2
    const newDefinition = new CommandDefinition();
    newDefinition.name = name;
    newDefinition.buttonConfig = getButtonConfigDefaultsV1(name, icon, translateKey, uiOnly, partOfPage, more);

    return newDefinition;
  }

  private create = (cmdSpecs: CmdSpec): void => {

    // open the import dialog
    this.addDef(new AppImport(cmdSpecs).commandDefinition);

    // open an edit-item dialog
    this.addDef(new Edit(cmdSpecs).commandDefinition);

    // new is a dialog to add something, and will not add if cancelled
    // new can also be used for mini-toolbars which just add an entity not attached to a module
    // in that case it's essential to add a contentType like
    // <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
    this.addDef(new New(cmdSpecs).commandDefinition);

    // add brings no dialog, just add an empty item
    this.addDef(new Add(cmdSpecs).commandDefinition);

    // create a metadata toolbar
    this.addDef(new Metadata(cmdSpecs).commandDefinition);

    // remove an item from the placeholder (usually for lists)
    this.addDef(new Remove(cmdSpecs).commandDefinition);

    // todo: work in progress related to https://github.com/2sic/2sxc/issues/618
    this.addDef(new Delete(cmdSpecs).commandDefinition);

    this.addDef(new MoveUp(cmdSpecs).commandDefinition);

    this.addDef(new MoveDown(cmdSpecs).commandDefinition);

    this.addDef(new InstanceList(cmdSpecs).commandDefinition);

    // todo: shouldn't be available if changes are not allowed
    this.addDef(new Publish(cmdSpecs).commandDefinition);

    this.addDef(new Replace(cmdSpecs).commandDefinition);

    //#region app-actions: app-settings, app-resources
    this.addDef(new AppSettings(cmdSpecs).commandDefinition);

    this.addDef(new AppResources(cmdSpecs).commandDefinition);
    //#endregion

    //#region app & zone
    this.addDef(new App(cmdSpecs).commandDefinition);

    this.addDef(new Zone(cmdSpecs).commandDefinition);
    //#endregion

    //#region template commands: contenttype, contentitems, template-query, template-develop, template-settings
    this.addDef(new ContentType(cmdSpecs).commandDefinition);

    this.addDef(new ContentItems(cmdSpecs).commandDefinition);

    this.addDef(new TemplateDevelop(cmdSpecs).commandDefinition);

    this.addDef(new TemplateQuery(cmdSpecs).commandDefinition);

    this.addDef(new TemplateSettings(cmdSpecs).commandDefinition);
    //#endregion template commands

    //#region custom code buttons
    this.addDef(new Custom(cmdSpecs).commandDefinition);
    //#endregion

    this.addDef(new Layout(cmdSpecs).commandDefinition);

    this.addDef(new More(cmdSpecs).commandDefinition);

    // show the version dialog
    this.addDef(new ItemHistory(cmdSpecs).commandDefinition);
  }
}
