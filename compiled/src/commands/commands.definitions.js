"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var make_def_1 = require("./make-def");
var _2sxc_translate_1 = require("../translate/2sxc.translate");
var contentBlock_actions_1 = require("../contentBlock/contentBlock.actions");
var item_commands_1 = require("../entity-manipulation/item-commands");
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
var act = {};
// quick helper so we can better debug the creation of definitions
function addDef(def) {
    act[def.name] = def;
}
;
function create(cmdSpecs) {
    var enableTools = cmdSpecs.canDesign;
    var isContent = cmdSpecs.isContent;
    // open the import dialog
    addDef(make_def_1.makeDef('app-import', 'Dashboard', '', true, false, {}));
    // open an edit-item dialog
    addDef(make_def_1.makeDef('edit', 'Edit', 'pencil', false, true, {
        params: { mode: 'edit' },
        showCondition: function (settings, modConfig) {
            return settings.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
        }
    }));
    // new is a dialog to add something, and will not add if cancelled
    // new can also be used for mini-toolbars which just add an entity not attached to a module
    // in that case it's essential to add a contentType like 
    // <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
    addDef(make_def_1.makeDef('new', 'New', 'plus', false, true, {
        params: { mode: 'new' },
        dialog: 'edit',
        showCondition: function (settings, modConfig) {
            return settings.contentType || modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; // don't provide new on the header-item
        },
        code: function (settings, event, sxc) {
            // todo - should refactor this to be a toolbarManager.contentBlock command
            var settingsExtend = Object.assign(settings, { sortOrder: settings.sortOrder + 1 });
            sxc.manage._commands._openNgDialog(settingsExtend, event, sxc);
        }
    }));
    // add brings no dialog, just add an empty item
    addDef(make_def_1.makeDef('add', 'AddDemo', 'plus-circled', false, true, {
        showCondition: function (settings, modConfig) {
            return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code: function (settings, event, sxc) {
            contentBlock_actions_1.addItem(sxc, settings.sortOrder + 1);
        }
    }));
    // create a metadata toolbar
    addDef(make_def_1.makeDef('metadata', 'Metadata', 'tag', false, false, {
        params: { mode: 'new' },
        dialog: 'edit',
        dynamicClasses: function (settings) {
            // if it doesn't have data yet, make it less strong
            return settings.entityId ? '' : 'empty';
            // return settings.items && settings.items[0].entityId ? "" : "empty";
        },
        showCondition: function (settings, modConfig) {
            return !!settings.metadata;
        },
        configureCommand: function (cmd) {
            var itm = {
                Title: 'EditFormTitle.Metadata',
                Metadata: Object.assign({ keyType: 'string', targetType: 10 }, cmd.settings.metadata)
            };
            Object.assign(cmd.items[0], itm);
        }
    }));
    // remove an item from the placeholder (usually for lists)
    addDef(make_def_1.makeDef('remove', 'Remove', 'minus-circled', false, true, {
        showCondition: function (settings, modConfig) {
            return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code: function (settings, event, sxc) {
            if (confirm(_2sxc_translate_1.translate('Toolbar.ConfirmRemove'))) {
                contentBlock_actions_1.removeFromList(sxc, settings.sortOrder);
                //sxc.manage.contentBlock
                //    .removeFromList(settings.sortOrder);
            }
        }
    }));
    // todo: work in progress related to https://github.com/2sic/2sxc/issues/618
    addDef(make_def_1.makeDef('delete', 'Delete', 'cancel', true, false, {
        // disabled: true,
        showCondition: function (settings, modConfig) {
            // can never be used for a modulelist item, as it is always in use somewhere
            if (settings.useModuleList)
                return false;
            // check if all data exists required for deleting
            return settings.entityId && settings.entityGuid && settings.entityTitle;
        },
        code: function (settings, event, sxc) {
            item_commands_1.contentItems.delete(sxc, settings.entityId, settings.entityGuid, settings.entityTitle);
        }
    }));
    addDef(make_def_1.makeDef('moveup', 'MoveUp', 'move-up', false, true, {
        showCondition: function (settings, modConfig) {
            return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
        },
        code: function (settings, event, sxc) {
            contentBlock_actions_1.changeOrder(sxc, settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
        }
    }));
    addDef(make_def_1.makeDef('movedown', 'MoveDown', 'move-down', false, true, {
        showCondition: function (settings, modConfig) {
            return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        },
        code: function (settings, event, sxc) {
            contentBlock_actions_1.changeOrder(sxc, settings.sortOrder, settings.sortOrder + 1);
        }
    }));
    addDef(make_def_1.makeDef('instance-list', 'Sort', 'list-numbered', false, true, {
        showCondition: function (settings, modConfig) {
            return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
        }
    }));
    // todo: shouldn't be available if changes are not allowed
    addDef(make_def_1.makeDef('publish', 'Unpublished', 'eye-off', false, false, {
        showCondition: function (settings, modConfig) {
            return settings.isPublished === false;
        },
        disabled: function (settings, modConfig) {
            return !cmdSpecs.allowPublish;
        },
        code: function (settings, event, sxc) {
            if (settings.isPublished)
                return alert(_2sxc_translate_1.translate('Toolbar.AlreadyPublished'));
            // if we have an entity-id, publish based on that
            if (settings.entityId)
                return contentBlock_actions_1.publishId(sxc, settings.entityId);
            var part = settings.sortOrder === -1 ? 'listcontent' : 'content';
            var index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
            return contentBlock_actions_1.publish(sxc, part, index);
        }
    }));
    addDef(make_def_1.makeDef('replace', 'Replace', 'replace', false, true, {
        showCondition: function (settings, modConfig) {
            return settings.useModuleList;
        }
    }));
    //#region app-actions: app-settings, app-resources
    addDef(make_def_1.makeDef('app-settings', 'AppSettings', 'sliders', true, false, {
        dialog: 'edit',
        disabled: function (settings, modConfig) {
            return cmdSpecs.appSettingsId === null;
        },
        title: 'Toolbar.AppSettings' + (cmdSpecs.appSettingsId === null ? 'Disabled' : ''),
        showCondition: function (settings, modConfig) {
            return enableTools && !isContent; // only if settings exist, or are 0 (to be created)
        },
        configureCommand: function (cmd) {
            cmd.items = [{ EntityId: cmdSpecs.appSettingsId }];
        },
        dynamicClasses: function (settings) {
            return cmdSpecs.appSettingsId !== null ? '' : 'empty'; // if it doesn't have a query, make it less strong
        }
    }));
    addDef(make_def_1.makeDef('app-resources', 'AppResources', 'language', true, false, {
        dialog: 'edit',
        disabled: function (settings, modConfig) {
            return cmdSpecs.appResourcesId === null;
        },
        title: 'Toolbar.AppResources' + (cmdSpecs.appResourcesId === null ? 'Disabled' : ''),
        showCondition: function (settings, modConfig) {
            return enableTools && !isContent; // only if resources exist or are 0 (to be created)...
        },
        configureCommand: function (cmd) {
            cmd.items = [{ EntityId: cmdSpecs.appResourcesId }];
        },
        dynamicClasses: function (settings) {
            return cmdSpecs.appResourcesId !== null ? '' : 'empty'; // if it doesn't have a query, make it less strong
        }
    }));
    //#endregion
    //#region app & zone
    addDef(make_def_1.makeDef('app', 'App', 'settings', true, false, {
        showCondition: function (settings, modConfig) {
            return enableTools;
        }
    }));
    addDef(make_def_1.makeDef('zone', 'Zone', 'manage', true, false, {
        showCondition: function (settings, modConfig) {
            return enableTools;
        }
    }));
    //#endregion
    //#region template commands: contenttype, contentitems, template-query, template-develop, template-settings
    addDef(make_def_1.makeDef('contenttype', 'ContentType', 'fields', true, false, {
        showCondition: function (settings, modConfig) {
            return enableTools;
        }
    }));
    addDef(make_def_1.makeDef('contentitems', 'ContentItems', 'table', true, false, {
        params: { contentTypeName: cmdSpecs.contentTypeId },
        showCondition: function (settings, modConfig) {
            return enableTools && (settings.contentType || cmdSpecs.contentTypeId);
        },
        configureCommand: function (cmd) {
            if (cmd.settings.contentType)
                cmd.params.contentTypeName = cmd.settings.contentType;
            // maybe: if item doesn't have a type, use that of template
            // else if (cmdSpecs.contentTypeId)
            //    cmd.params.contentTypeName = cmdSpecs.contentTypeId;
            if (cmd.settings.filters) {
                var enc = JSON.stringify(cmd.settings.filters);
                // special case - if it contains a "+" character, this won't survive 
                // encoding through the hash as it's always replaced with a space, even if it would be preconverted to %2b
                // so we're base64 encoding it - see https://github.com/2sic/2sxc/issues/1061
                if (enc.indexOf('+') > -1)
                    enc = btoa(enc);
                cmd.params.filters = enc;
            }
        }
    }));
    addDef(make_def_1.makeDef('template-develop', 'Develop', 'code', true, false, {
        newWindow: true,
        dialog: 'develop',
        showCondition: function (settings, modConfig) {
            return enableTools;
        },
        configureCommand: function (cmd) {
            cmd.items = [{ EntityId: cmdSpecs.templateId }];
        }
    }));
    addDef(make_def_1.makeDef('template-query', 'QueryEdit', 'filter', true, false, {
        dialog: 'pipeline-designer',
        params: { pipelineId: cmdSpecs.queryId },
        newWindow: true,
        disabled: function (settings, modConfig) {
            return cmdSpecs.appSettingsId === null;
        },
        title: 'Toolbar.QueryEdit' + (cmdSpecs.queryId === null ? 'Disabled' : ''),
        showCondition: function (settings, modConfig) {
            return enableTools && !isContent;
        },
        dynamicClasses: function (settings) {
            return cmdSpecs.queryId ? '' : 'empty'; // if it doesn't have a query, make it less strong
        }
    }));
    addDef(make_def_1.makeDef('template-settings', 'TemplateSettings', 'sliders', true, false, {
        dialog: 'edit',
        showCondition: function (settings, modConfig) {
            return enableTools && !isContent;
        },
        configureCommand: function (cmd) {
            cmd.items = [{ EntityId: cmdSpecs.templateId }];
        }
    }));
    //#endregion template commands
    //#region custom code buttons
    addDef(make_def_1.makeDef('custom', 'Custom', 'bomb', true, false, {
        code: function (settings, event, sxc) {
            var fn;
            console.log('custom action with code - BETA feature, may change');
            if (!settings.customCode) {
                console.warn('custom code action, but no onclick found to run', settings);
                return;
            }
            try {
                fn = new Function('settings', 'event', 'sxc', settings.customCode); // jshint ignore:line
                fn(settings, event, sxc);
            }
            catch (err) {
                console.error('error in custom button-code: ', settings);
            }
        }
    }));
    //#endregion
    addDef(make_def_1.makeDef('layout', 'ChangeLayout', 'glasses', true, true, {
        inlineWindow: true
    }));
    addDef(make_def_1.makeDef('more', 'MoreActions', 'options btn-mode', true, false, {
        code: function (settings, event, sxc) {
            var btn = $(event.target);
            var fullMenu = btn.closest('ul.sc-menu');
            var oldState = Number(fullMenu.attr('data-state') || 0);
            var max = Number(fullMenu.attr('group-count'));
            var newState = (oldState + 1) % max;
            fullMenu.removeClass('group-' + oldState)
                .addClass('group-' + newState)
                .attr('data-state', newState);
        }
    }));
    // show the version dialog
    addDef(make_def_1.makeDef('item-history', 'ItemHistory', 'clock', true, false, {
        inlineWindow: true,
        fullScreen: true
    }));
    return act;
}
exports.create = create;
;
//# sourceMappingURL=commands.definitions.js.map