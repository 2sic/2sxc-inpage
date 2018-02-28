﻿import { CmdSpec } from '../../commands/cmd-spec';
import { Definition } from '../../commands/definition';
import { Settings } from '../../commands/settings';
import { addItem, changeOrder, publish, publishId, removeFromList } from '../../contentBlock/actions';
import { DataEditContext } from '../../data-edit-context/data-edit-context';
import { contentItems } from '../../entity-manipulation/item-commands';
import { translate } from '../../translate/2sxc.translate';
import { getButtonConfigDefaultsV1 } from '../button/expand-button-config';
import { CommandDefinition } from './command-definition';
import { Add } from './commands/add';
import { AppImport } from './commands/app-import';
import { Edit } from './commands/edit';
import { New } from './commands/new';
import {Metadata} from './commands/metadata';
import { Remove } from './commands/remove';

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

    const enableTools = cmdSpecs.canDesign; // todo: delete this after refactoring
    const isContent = cmdSpecs.isContent; // todo: delete this after refactoring

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
    this.addDef(this.makeDef('delete', 'Delete', 'cancel', true, false, {
      // disabled: true,
      showCondition(settings, modConfig) {
        // can never be used for a modulelist item, as it is always in use somewhere
        if (settings.useModuleList)
          return false;

        // check if all data exists required for deleting
        return settings.entityId && settings.entityGuid && settings.entityTitle;
      },
      code(settings, event, sxc) {
        contentItems.delete(sxc, settings.entityId, settings.entityGuid, settings.entityTitle);
      },
    }));

    this.addDef(this.makeDef('moveup', 'MoveUp', 'move-up', false, true, {
      showCondition(settings, modConfig) {
        return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
      },
      code(settings, event, sxc) {
        changeOrder(sxc, settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
      },
    }));

    this.addDef(this.makeDef('movedown', 'MoveDown', 'move-down', false, true, {
      showCondition(settings, modConfig) {
        // TODO: do not display if is last item in list
        return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
      },
      code(settings, event, sxc) {
        // TODO: make sure index is never greater than the amount of items
        changeOrder(sxc, settings.sortOrder, settings.sortOrder + 1);
      },
    }));

    this.addDef(this.makeDef('instance-list', 'Sort', 'list-numbered', false, true, {
      showCondition(settings, modConfig) {
        return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
      },
    }));

    // todo: shouldn't be available if changes are not allowed
    this.addDef(this.makeDef('publish', 'Unpublished', 'eye-off', false, false, {
      showCondition(settings, modConfig) {
        return settings.isPublished === false;
      },
      disabled(settings, modConfig) {
        return !cmdSpecs.allowPublish;
      },
      code(settings, event, sxc) {
        if (settings.isPublished) return alert(translate('Toolbar.AlreadyPublished'));

        // if we have an entity-id, publish based on that
        if (settings.entityId) return publishId(sxc, settings.entityId);

        const part: string = settings.sortOrder === -1 ? 'listcontent' : 'content';
        const index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
        return publish(sxc, part, index);
      },
    }));

    this.addDef(this.makeDef('replace', 'Replace', 'replace', false, true, {
      showCondition(settings, modConfig) {
        return settings.useModuleList;
      },
    }));

    //#region app-actions: app-settings, app-resources
    this.addDef(this.makeDef('app-settings', 'AppSettings', 'sliders', true, false, {
      dialog: 'edit',
      disabled(settings, modConfig) {
        return cmdSpecs.appSettingsId === null;
      },
      title: 'Toolbar.AppSettings' + (cmdSpecs.appSettingsId === null ? 'Disabled' : ''),
      showCondition(settings, modConfig) {
        return enableTools && !isContent; // only if settings exist, or are 0 (to be created)
      },
      configureCommand(cmd) {
        cmd.items = [{ EntityId: cmdSpecs.appSettingsId }];
      },
      dynamicClasses(settings) {
        return cmdSpecs.appSettingsId !== null ? '' : 'empty';  // if it doesn't have a query, make it less strong
      },
    }));

    this.addDef(this.makeDef('app-resources', 'AppResources', 'language', true, false, {
      dialog: 'edit',
      disabled(settings, modConfig) {
        return cmdSpecs.appResourcesId === null;
      },
      title: 'Toolbar.AppResources' + (cmdSpecs.appResourcesId === null ? 'Disabled' : ''),
      showCondition(settings, modConfig) {
        return enableTools && !isContent; // only if resources exist or are 0 (to be created)...
      },
      configureCommand(cmd) {
        cmd.items = [{ EntityId: cmdSpecs.appResourcesId }];
      },
      dynamicClasses(settings) {
        return cmdSpecs.appResourcesId !== null ? '' : 'empty';  // if it doesn't have a query, make it less strong
      },
    }));
    //#endregion

    //#region app & zone
    this.addDef(this.makeDef('app', 'App', 'settings', true, false, {
      showCondition(settings, modConfig) {
        return enableTools;
      },
    }));

    this.addDef(this.makeDef('zone', 'Zone', 'manage', true, false, {
      showCondition(settings, modConfig) {
        return enableTools;
      },
    }));
    //#endregion

    //#region template commands: contenttype, contentitems, template-query, template-develop, template-settings
    this.addDef(this.makeDef('contenttype', 'ContentType', 'fields', true, false, {
      showCondition(settings, modConfig) {
        return enableTools;
      },
    }));

    this.addDef(this.makeDef('contentitems', 'ContentItems', 'table', true, false, {
      params: { contentTypeName: cmdSpecs.contentTypeId },
      showCondition(settings, modConfig) {
        return enableTools && (settings.contentType || cmdSpecs.contentTypeId);
      },
      configureCommand(cmd) {
        if (cmd.settings.contentType) // optionally override with custom type
          cmd.params.contentTypeName = cmd.settings.contentType;
        // maybe: if item doesn't have a type, use that of template
        // else if (cmdSpecs.contentTypeId)
        //    cmd.params.contentTypeName = cmdSpecs.contentTypeId;
        if (cmd.settings.filters) {
          let enc = JSON.stringify(cmd.settings.filters);

          // special case - if it contains a "+" character, this won't survive
          // encoding through the hash as it's always replaced with a space, even if it would be pre converted to %2b
          // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
          if (enc.indexOf('+') > -1)
            enc = btoa(enc);
          cmd.params.filters = enc;
        }
      },
    }));

    this.addDef(this.makeDef('template-develop', 'Develop', 'code', true, false, {
      newWindow: true,
      dialog: 'develop',
      showCondition(settings, modConfig) {
        return enableTools;
      },
      configureCommand(cmd) {
        cmd.items = [{ EntityId: cmdSpecs.templateId }];
      },
    }));

    this.addDef(this.makeDef('template-query', 'QueryEdit', 'filter', true, false, {
      dialog: 'pipeline-designer',
      params: { pipelineId: cmdSpecs.queryId },
      newWindow: true,
      disabled(settings, modConfig) {
        return cmdSpecs.appSettingsId === null;
      },
      title: 'Toolbar.QueryEdit' + (cmdSpecs.queryId === null ? 'Disabled' : ''),
      showCondition(settings, modConfig) {
        return enableTools && !isContent;
      },
      dynamicClasses(settings) {
        return cmdSpecs.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
      },
    }));

    this.addDef(this.makeDef('template-settings', 'TemplateSettings', 'sliders', true, false, {
      dialog: 'edit',
      showCondition(settings, modConfig) {
        return enableTools && !isContent;
      },
      configureCommand(cmd) {
        cmd.items = [{ EntityId: cmdSpecs.templateId }];
      },
    }));
    //#endregion template commands

    //#region custom code buttons
    this.addDef(this.makeDef('custom', 'Custom', 'bomb', true, false, {
      code(settings, event, sxc) {
        console.log('custom action with code - BETA feature, may change');
        if (!settings.customCode) {
          console.warn('custom code action, but no onclick found to run', settings);
          return;
        }
        try {
          const fn = new Function('settings', 'event', 'sxc', settings.customCode); // jshint ignore:line
          fn(settings, event, sxc);
        } catch (err) {
          console.error('error in custom button-code: ', settings);
        }
      },
    }));
    //#endregion

    this.addDef(this.makeDef('layout', 'ChangeLayout', 'glasses', true, true, {
      inlineWindow: true,
    }));

    this.addDef(this.makeDef('more', 'MoreActions', 'options btn-mode', true, false, {
      code(settings, event, sxc) {
        const btn: any = $(event.target);
        const fullMenu: any = btn.closest('ul.sc-menu');
        const oldState: number = Number(fullMenu.attr('data-state') || 0);
        const max: number = Number(fullMenu.attr('group-count'));
        const newState: number = (oldState + 1) % max;

        fullMenu.removeClass('group-' + oldState)
          .addClass('group-' + newState)
          .attr('data-state', newState);
      },
    }));

    // show the version dialog
    this.addDef(this.makeDef('item-history', 'ItemHistory', 'clock', true, false, {
      inlineWindow: true,
      fullScreen: true,
    }));
  }

}
