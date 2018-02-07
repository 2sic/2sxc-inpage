﻿import { Action } from './action';
import { Definition } from './definition';
import { CmdSpec } from './cmd-spec';
import { Settings } from './settings';
import { makeDef } from './make-def';
import { translate } from '../translate/2sxc.translate';
import { addItem, changeOrder, publish, publishId, removeFromList } from '../contentBlock/actions';
import { contentItems } from '../entity-manipulation/item-commands';

/*
 * Actions of 2sxc - mostly used in toolbars
 * 
 * Minimal documentation regarding a button
 * the button can have the following properties / methods
 * - the indexer in the array (usually the same as the name)
 * - name (created in the buttonConfig)
 * - title - actually the translation key to retrieve the title (buttonConfig)
 * - icon - the icon-class
 * - uiActionOnly - true/false if this is just something visual; otherwise a webservice will ensure that a content-group exists (for editing etc.)
 * - showCondition(settings, moduleConfiguration) - would conditionally prevent adding this button by default
 * - code(settings, event) - the code executed on click, if it's not the default action
 * - dynamicClasses(settings) - can conditionally add more css-class names to add to the button, like the "empty" added if something doesn't have metadata
 * - disabled (new!)
 * - params - ...
 */
let act: Action = {};

// quick helper so we can better debug the creation of definitions
function addDef(def: Definition): void {
  act[def.name] = def;
};

export function create(cmdSpecs: CmdSpec): Action {
  let enableTools = cmdSpecs.canDesign;
  let isContent = cmdSpecs.isContent;

  // open the import dialog
  addDef(makeDef('app-import', 'Dashboard', '', true, false, {}));

  // open an edit-item dialog
  addDef(makeDef('edit', 'Edit', 'pencil', false, true, {
    params: { mode: 'edit' },
    showCondition(settings, modConfig) {
      return settings.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
    }
  }));

  // new is a dialog to add something, and will not add if cancelled
  // new can also be used for mini-toolbars which just add an entity not attached to a module
  // in that case it's essential to add a contentType like 
  // <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
  addDef(makeDef('new', 'New', 'plus', false, true, {
    params: { mode: 'new' },
    dialog: 'edit', // don't use "new" (default) but use "edit"
    showCondition(settings, modConfig) {
      return settings.contentType || modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; // don't provide new on the header-item
    },
    code(settings, event, sxc) {
      // todo - should refactor this to be a toolbarManager.contentBlock command
      const settingsExtend = Object.assign(settings, { sortOrder: settings.sortOrder + 1 }) as Settings;
      sxc.manage._commands._openNgDialog(settingsExtend, event, sxc);
    }
  }));

  // add brings no dialog, just add an empty item
  addDef(makeDef('add', 'AddDemo', 'plus-circled', false, true, {
    showCondition(settings, modConfig) {
      return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
    },
    code(settings, event, sxc) {
      addItem(sxc, settings.sortOrder + 1);
    }
  }));

  // create a metadata toolbar
  addDef(makeDef('metadata', 'Metadata', 'tag', false, false, {
    params: { mode: 'new' },
    dialog: 'edit', // don't use "new" (default) but use "edit"
    dynamicClasses(settings: Settings): string {
      // if it doesn't have data yet, make it less strong
      return settings.entityId ? '' : 'empty';
      // return settings.items && settings.items[0].entityId ? "" : "empty";
    },
    showCondition(settings, modConfig) {
      return !!settings.metadata;
    }, // only add a metadata-button if it has metadata-infos
    configureCommand(cmd) {
      const itm = {
        Title: 'EditFormTitle.Metadata',
        Metadata: Object.assign({ keyType: 'string', targetType: 10 }, cmd.settings.metadata)
      };
      Object.assign(cmd.items[0], itm);
    }
  }));

  // remove an item from the placeholder (usually for lists)
  addDef(makeDef('remove', 'Remove', 'minus-circled', false, true, {
    showCondition(settings, modConfig) {
      return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
    },
    code(settings, event, sxc) {
      if (confirm(translate('Toolbar.ConfirmRemove'))) {
        removeFromList(sxc, settings.sortOrder);
        //sxc.manage.contentBlock
        //    .removeFromList(settings.sortOrder);
      }
    }
  }));

  // todo: work in progress related to https://github.com/2sic/2sxc/issues/618
  addDef(makeDef('delete', 'Delete', 'cancel', true, false, {
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
    }
  }));

  addDef(makeDef('moveup', 'MoveUp', 'move-up', false, true, {
    showCondition(settings, modConfig) {
      return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
    },
    code(settings, event, sxc) {
      changeOrder(sxc, settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
    }
  }));

  addDef(makeDef('movedown', 'MoveDown', 'move-down', false, true, {
    showCondition(settings, modConfig) {
      return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
    },
    code(settings, event, sxc) {
      changeOrder(sxc, settings.sortOrder, settings.sortOrder + 1);
    }
  }));

  addDef(makeDef('instance-list', 'Sort', 'list-numbered', false, true, {
    showCondition(settings, modConfig) {
      return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
    }
  }));

  // todo: shouldn't be available if changes are not allowed
  addDef(makeDef('publish', 'Unpublished', 'eye-off', false, false, {
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
    }
  }));

  addDef(makeDef('replace', 'Replace', 'replace', false, true, {
    showCondition(settings, modConfig) {
      return settings.useModuleList;
    }
  }));

  //#region app-actions: app-settings, app-resources
  addDef(makeDef('app-settings', 'AppSettings', 'sliders', true, false, {
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
    }
  }));

  addDef(makeDef('app-resources', 'AppResources', 'language', true, false, {
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
    }
  }));
  //#endregion

  //#region app & zone
  addDef(makeDef('app', 'App', 'settings', true, false, {
    showCondition(settings, modConfig) {
      return enableTools;
    }
  }));

  addDef(makeDef('zone', 'Zone', 'manage', true, false, {
    showCondition(settings, modConfig) {
      return enableTools;
    }
  }));
  //#endregion

  //#region template commands: contenttype, contentitems, template-query, template-develop, template-settings
  addDef(makeDef('contenttype', 'ContentType', 'fields', true, false, {
    showCondition(settings, modConfig) {
      return enableTools;
    }
  }));

  addDef(makeDef('contentitems', 'ContentItems', 'table', true, false, {
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
        // encoding through the hash as it's always replaced with a space, even if it would be preconverted to %2b
        // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
        if (enc.indexOf('+') > -1)
          enc = btoa(enc);
        cmd.params.filters = enc;
      }
    }
  }));

  addDef(makeDef('template-develop', 'Develop', 'code', true, false, {
    newWindow: true,
    dialog: 'develop',
    showCondition(settings, modConfig) {
      return enableTools;
    },
    configureCommand(cmd) {
      cmd.items = [{ EntityId: cmdSpecs.templateId }];
    }
  }));

  addDef(makeDef('template-query', 'QueryEdit', 'filter', true, false, {
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
    }
  }));

  addDef(makeDef('template-settings', 'TemplateSettings', 'sliders', true, false, {
    dialog: 'edit',
    showCondition(settings, modConfig) {
      return enableTools && !isContent;
    },
    configureCommand(cmd) {
      cmd.items = [{ EntityId: cmdSpecs.templateId }];
    }

  }));
  //#endregion template commands

  //#region custom code buttons
  addDef(makeDef('custom', 'Custom', 'bomb', true, false, {
    code(settings, event, sxc) {
      let fn;
      console.log('custom action with code - BETA feature, may change');
      if (!settings.customCode) {
        console.warn('custom code action, but no onclick found to run', settings);
        return;
      }
      try {
        fn = new Function('settings', 'event', 'sxc', settings.customCode); // jshint ignore:line
        fn(settings, event, sxc);
      } catch (err) {
        console.error('error in custom button-code: ', settings);
      }
    }
  }));
  //#endregion

  addDef(makeDef('layout', 'ChangeLayout', 'glasses', true, true, {
    inlineWindow: true
  }));

  addDef(makeDef('more', 'MoreActions', 'options btn-mode', true, false, {
    code(settings, event, sxc) {
      const btn: any = $(event.target);
      let fullMenu: any = btn.closest('ul.sc-menu');
      const oldState: number = Number(fullMenu.attr('data-state') || 0);
      const max: number = Number(fullMenu.attr('group-count'));
      const newState: number = (oldState + 1) % max;

      fullMenu.removeClass('group-' + oldState)
        .addClass('group-' + newState)
        .attr('data-state', newState);
    }
  }));

  // show the version dialog
  addDef(makeDef('item-history', 'ItemHistory', 'clock', true, false, {
    inlineWindow: true,
    fullScreen: true
  }));

  return act;
};

