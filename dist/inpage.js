/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
__webpack_require__(4);
__webpack_require__(5);
__webpack_require__(6);
__webpack_require__(7);
__webpack_require__(8);
__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);
__webpack_require__(12);
__webpack_require__(13);
__webpack_require__(14);
__webpack_require__(15);
__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);
__webpack_require__(20);
__webpack_require__(21);
__webpack_require__(22);
__webpack_require__(23);
module.exports = __webpack_require__(24);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function () {
    $2sxc._commands = {};
})();
//# sourceMappingURL=commands.{}.js.map

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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
(function () {
    // helper function to create the configuration object
    function makeDef(name, translateKey, icon, uiOnly, partOfPage, more) {
        if (typeof (partOfPage) !== "boolean")
            throw "partOfPage in commands not provided, order will be wrong!";
        return $2sxc._lib.extend({
            name: name,
            title: "Toolbar." + translateKey,
            icon: "icon-sxc-" + icon,
            uiActionOnly: uiOnly,
            partOfPage: partOfPage
        }, more);
    }
    $2sxc._commands.definitions = {};
    $2sxc._commands.definitions.create = function (cmdSpecs) {
        var enableTools = cmdSpecs.canDesign;
        var isContent = cmdSpecs.isContent;
        var act = {
            // show the basic dashboard which allows view-changing
            // 2017-09-06 2dm "dash-view" deprecated - old name for now "layout" - should not be used any more!
            //"dash-view": makeDef("dash-view", "Dashboard", "", true, { inlineWindow: true }),
            // open the import dialog
            "app-import": makeDef("app-import", "Dashboard", "", true, false, {}),
            // open an edit-item dialog
            'edit': makeDef("edit", "Edit", "pencil", false, true, {
                params: { mode: "edit" },
                showCondition: function (settings, modConfig) {
                    return settings.entityId || settings.useModuleList; // need ID or a "slot", otherwise edit won't work
                }
            }),
            // new is a dialog to add something, and will not add if cancelled
            // new can also be used for mini-toolbars which just add an entity not attached to a module
            // in that case it's essential to add a contentType like 
            // <ul class="sc-menu" data-toolbar='{"action":"new", "contentType": "Category"}'></ul>
            'new': makeDef("new", "New", "plus", false, true, {
                params: { mode: "new" },
                dialog: "edit",
                showCondition: function (settings, modConfig) {
                    return settings.contentType || modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; // don't provide new on the header-item
                },
                code: function (settings, event, sxc) {
                    // todo - should refactor this to be a toolbarManager.contentBlock command
                    sxc.manage._commands._openNgDialog($2sxc._lib.extend({}, settings, { sortOrder: settings.sortOrder + 1 }), event, sxc);
                }
            }),
            // add brings no dialog, just add an empty item
            'add': makeDef("add", "AddDemo", "plus-circled", false, true, {
                showCondition: function (settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, sxc) {
                    $2sxc._contentBlock.addItem(sxc, settings.sortOrder + 1);
                }
            }),
            // create a metadata toolbar
            "metadata": makeDef("metadata", "Metadata", "tag", false, false, {
                params: { mode: "new" },
                dialog: "edit",
                dynamicClasses: function (settings) {
                    // if it doesn't have data yet, make it less strong
                    return settings.entityId ? "" : "empty";
                    // return settings.items && settings.items[0].entityId ? "" : "empty";
                },
                showCondition: function (settings) {
                    return !!settings.metadata;
                },
                configureCommand: function (cmd) {
                    var itm = {
                        Title: "EditFormTitle.Metadata",
                        Metadata: $2sxc._lib.extend({ keyType: "string", targetType: 10 }, cmd.settings.metadata)
                    };
                    $2sxc._lib.extend(cmd.items[0], itm);
                }
            }),
            // remove an item from the placeholder (usually for lists)
            'remove': makeDef("remove", "Remove", "minus-circled", false, true, {
                showCondition: function (settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, sxc) {
                    if (confirm($2sxc.translate("Toolbar.ConfirmRemove"))) {
                        $2sxc._contentBlock.removeFromList(sxc, settings.sortOrder);
                        //sxc.manage.contentBlock
                        //    .removeFromList(settings.sortOrder);
                    }
                }
            }),
            // todo: work in progress related to https://github.com/2sic/2sxc/issues/618
            'delete': makeDef("deleteItem", "Delete", "cancel", true, false, {
                // disabled: true,
                showCondition: function (settings) {
                    // can never be used for a modulelist item, as it is always in use somewhere
                    if (settings.useModuleList)
                        return false;
                    // check if all data exists required for deleting
                    return settings.entityId && settings.entityGuid && settings.entityTitle;
                },
                code: function (settings, event, sxc) {
                    $2sxc.contentItems.delete(sxc, settings.entityId, settings.entityGuid, settings.entityTitle);
                }
            }),
            'moveup': makeDef("moveup", "MoveUp", "move-up", false, true, {
                showCondition: function (settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1 && settings.sortOrder !== 0;
                },
                code: function (settings, event, sxc) {
                    $2sxc._contentBlock.changeOrder(sxc, settings.sortOrder, Math.max(settings.sortOrder - 1, 0));
                }
            }),
            'movedown': makeDef("movedown", "MoveDown", "move-down", false, true, {
                showCondition: function (settings, modConfig) {
                    return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1;
                },
                code: function (settings, event, sxc) {
                    $2sxc._contentBlock.changeOrder(sxc, settings.sortOrder, settings.sortOrder + 1);
                }
            }),
            'instance-list': makeDef("instance-list", "Sort", "list-numbered", false, true, {
                showCondition: function (settings, modConfig) { return modConfig.isList && settings.useModuleList && settings.sortOrder !== -1; }
            }),
            // todo: shouldn't be available if changes are not allowed
            'publish': makeDef("publish", "Unpublished", "eye-off", false, false, {
                showCondition: function (settings, modConfig) {
                    return settings.isPublished === false;
                },
                disabled: function (settings, modConfig) {
                    return !cmdSpecs.allowPublish;
                },
                code: function (settings, event, sxc) {
                    if (settings.isPublished)
                        return alert($2sxc.translate("Toolbar.AlreadyPublished"));
                    // if we have an entity-id, publish based on that
                    if (settings.entityId)
                        return $2sxc._contentBlock.publishId(sxc, settings.entityId);
                    var part = settings.sortOrder === -1 ? "listcontent" : "content";
                    var index = settings.sortOrder === -1 ? 0 : settings.sortOrder;
                    return $2sxc._contentBlock.publish(sxc, part, index);
                }
            }),
            'replace': makeDef("replace", "Replace", "replace", false, true, {
                showCondition: function (settings) { return settings.useModuleList; }
            }),
            //#region app-actions: app-settings, app-resources
            'app-settings': makeDef("app-settings", "AppSettings", "sliders", true, false, {
                dialog: "edit",
                disabled: cmdSpecs.appSettingsId === null,
                title: "Toolbar.AppSettings" + (cmdSpecs.appSettingsId === null ? "Disabled" : ""),
                showCondition: function (settings, modConfig) {
                    return enableTools && !isContent; // only if settings exist, or are 0 (to be created)
                },
                configureCommand: function (cmd) {
                    cmd.items = [{ EntityId: cmdSpecs.appSettingsId }];
                },
                dynamicClasses: function (settings) {
                    return cmdSpecs.appSettingsId !== null ? "" : "empty"; // if it doesn't have a query, make it less strong
                }
            }),
            'app-resources': makeDef("app-resources", "AppResources", "language", true, false, {
                dialog: "edit",
                disabled: cmdSpecs.appResourcesId === null,
                title: "Toolbar.AppResources" + (cmdSpecs.appResourcesId === null ? "Disabled" : ""),
                showCondition: function (settings, modConfig) {
                    return enableTools && !isContent; // only if resources exist or are 0 (to be created)...
                },
                configureCommand: function (cmd) {
                    cmd.items = [{ EntityId: cmdSpecs.appResourcesId }];
                },
                dynamicClasses: function (settings) {
                    return cmdSpecs.appResourcesId !== null ? "" : "empty"; // if it doesn't have a query, make it less strong
                }
            }),
            //#endregion
            //#region app & zone
            'app': makeDef("app", "App", "settings", true, false, {
                showCondition: enableTools
            }),
            'zone': makeDef("zone", "Zone", "manage", true, false, {
                showCondition: enableTools
            })
            //#endregion
        };
        // quick helper so we can better debug the creation of definitions
        function addDef(def) {
            act[def.name] = def;
        }
        //#region template commands: contenttype, contentitems, template-query, template-develop, template-settings
        addDef(makeDef("contenttype", "ContentType", "fields", true, false, {
            showCondition: enableTools
        }));
        addDef(makeDef("contentitems", "ContentItems", "table", true, false, {
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
                    if (enc.indexOf("+") > -1)
                        enc = btoa(enc);
                    cmd.params.filters = enc;
                }
            }
        }));
        addDef(makeDef("template-develop", "Develop", "code", true, false, {
            newWindow: true,
            dialog: "develop",
            showCondition: enableTools,
            configureCommand: function (cmd) {
                cmd.items = [{ EntityId: cmdSpecs.templateId }];
            }
        }));
        addDef(makeDef("template-query", "QueryEdit", "filter", true, false, {
            dialog: "pipeline-designer",
            params: { pipelineId: cmdSpecs.queryId },
            newWindow: true,
            disabled: cmdSpecs.appSettingsId === null,
            title: "Toolbar.QueryEdit" + (cmdSpecs.queryId === null ? "Disabled" : ""),
            showCondition: function (settings, modConfig) {
                return enableTools && !isContent;
            },
            dynamicClasses: function (settings) {
                return cmdSpecs.queryId ? "" : "empty"; // if it doesn't have a query, make it less strong
            }
        }));
        addDef(makeDef("template-settings", "TemplateSettings", "sliders", true, false, {
            dialog: "edit",
            showCondition: enableTools,
            configureCommand: function (cmd) {
                cmd.items = [{ EntityId: cmdSpecs.templateId }];
            }
        }));
        //#endregion template commands
        //#region custom code buttons
        addDef(makeDef("custom", "Custom", "bomb", true, false, {
            code: function (settings, event, sxc) {
                var fn;
                console.log("custom action with code - BETA feature, may change");
                if (!settings.customCode) {
                    console.warn("custom code action, but no onclick found to run", settings);
                    return;
                }
                try {
                    fn = new Function("settings", "event", "sxc", settings.customCode); // jshint ignore:line
                    fn(settings, event, sxc);
                }
                catch (err) {
                    console.error("error in custom button-code: ", settings);
                }
            }
        }));
        //#endregion
        addDef(makeDef("layout", "ChangeLayout", "glasses", true, true, {
            inlineWindow: true
        }));
        addDef(makeDef("more", "MoreActions", "options btn-mode", true, false, {
            code: function (settings, event) {
                var btn = $(event.target), fullMenu = btn.closest("ul.sc-menu"), oldState = Number(fullMenu.attr("data-state") || 0), max = Number(fullMenu.attr("group-count")), newState = (oldState + 1) % max;
                fullMenu.removeClass("group-" + oldState)
                    .addClass("group-" + newState)
                    .attr("data-state", newState);
            }
        }));
        // show the version dialog
        addDef(makeDef("item-history", "ItemHistory", "clock", true, false, {
            inlineWindow: true,
            fullScreen: true
        }));
        return act;
    };
})();
//# sourceMappingURL=commands.definitions.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function () {
    $2sxc._commands.initializeInstanceCommands = function (editContext) {
        var cg = editContext.ContentGroup;
        return $2sxc._commands.definitions.create({
            canDesign: editContext.User.CanDesign,
            templateId: cg.TemplateId,
            contentTypeId: cg.ContentTypeName,
            isContent: cg.IsContent,
            queryId: cg.QueryId,
            appResourcesId: cg.AppResourcesId,
            appSettingsId: cg.AppSettingsId,
            allowPublish: editContext.ContentBlock.VersioningRequirements === $2sxc.c.publishAllowed
        });
    };
})();
//# sourceMappingURL=commands.instanceCommands.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
 * this is a content block in the browser
 *
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 *
 * Maybe ToDo 2cb:
 * 2sxc should have one entry point (interface to browser context) only.
 * Otherwise, we cannot know, when which part will be executed and debugging becomes very difficult.
 *
 */
(function () {
    /**
     * The main content-block manager
     */
    $2sxc._contentBlock = {
        // constants
        cViewWithoutContent: '_LayoutElement',
        cUseExistingTemplate: -1
    };
})();
//# sourceMappingURL=contentBlock.{}.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
 * this is a content block in the browser
 *
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
(function () {
    var cbm = $2sxc._contentBlock;
    // internal helper, to do something and reload the content block
    cbm.getAndReload = function (sxc, url, params) {
        return sxc.webApi.get({
            url: url,
            params: params
        }).then(function () { cbm.reloadAndReInitialize(sxc); });
    };
    /**
     * remove an item from a list, then reload
     * @param {} sxc
     * @param {} sortOrder
     * @returns {}
     */
    cbm.removeFromList = function (sxc, sortOrder) {
        return cbm.getAndReload(sxc, "view/module/removefromlist", { sortOrder: sortOrder });
    };
    /**
     * change the order of an item in a list, then reload
     * @param {} sxc
     * @param {} initOrder
     * @param {} newOrder
     * @returns {}
     */
    cbm.changeOrder = function (sxc, initOrder, newOrder) {
        return cbm.getAndReload(sxc, "view/module/changeorder", { sortOrder: initOrder, destinationSortOrder: newOrder });
    };
    /**
     * add an item to the list at this position
     * @param {} sxc
     * @param {} sortOrder
     * @returns {}
     */
    cbm.addItem = function (sxc, sortOrder) {
        return cbm.getAndReload(sxc, "view/module/additem", { sortOrder: sortOrder });
    };
    /**
     * set a content-item in this block to published, then reload
     * @param {} sxc
     * @param {} part
     * @param {} sortOrder
     * @returns {}
     */
    cbm.publish = function (sxc, part, sortOrder) {
        return cbm.getAndReload(sxc, "view/module/publish", { part: part, sortOrder: sortOrder });
    };
    /**
     * publish an item using it's ID
     * @param {} sxc
     * @param {} entityId
     * @returns {}
     */
    cbm.publishId = function (sxc, entityId) {
        return cbm.getAndReload(sxc, "view/module/publish", { id: entityId });
    };
})();
//# sourceMappingURL=contentBlock.actions.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// contains commands to create/move/delete a contentBlock in a page
$2sxc._contentBlock.manipulator = function (sxc) {
    return {
        create: create,
        move: move,
        delete: remove
    };
    function create(parentId, fieldName, index, appName, container, newGuid) {
        // the wrapper, into which this will be placed and the list of pre-existing blocks
        var listTag = container;
        if (listTag.length === 0)
            return alert('can\'t add content-block as we couldn\'t find the list');
        var cblockList = listTag.find('div.sc-content-block');
        if (index > cblockList.length)
            index = cblockList.length; // make sure index is never greater than the amount of items
        var params = {
            parentId: parentId,
            field: fieldName,
            sortOrder: index,
            app: appName,
            guid: newGuid,
        };
        return sxc.webApi.get({ url: 'view/module/generatecontentblock', params: params })
            .then(function (result) {
            var newTag = $(result); // prepare tag for inserting
            // should I add it to a specific position...
            if (cblockList.length > 0 && index > 0)
                $(cblockList[cblockList.length > index - 1 ? index - 1 : cblockList.length - 1])
                    .after(newTag);
            else
                listTag.prepend(newTag);
            var sxcNew = $2sxc(newTag);
            $2sxc._toolbarManager.buildToolbars(newTag);
        });
    }
    function move(parentId, field, indexFrom, indexTo) {
        var params = {
            parentId: parentId,
            field: field,
            indexFrom: indexFrom,
            indexTo: indexTo,
        };
        // todo: need sxc!
        return sxc.webApi.get({ url: 'view/module/moveiteminlist', params: params })
            .then(function () {
            console.log("done moving!");
            window.location.reload();
        });
    }
    // delete a content-block inside a list of content-blocks
    function remove(parentId, field, index) {
        if (!confirm($2sxc.translate('QuickInsertMenu.ConfirmDelete')))
            return null;
        var params = {
            parentId: parentId,
            field: field,
            index: index,
        };
        return sxc.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
            .then(function () {
            console.log('done deleting!');
            window.location.reload();
        });
    }
};
//# sourceMappingURL=contentBlock.manipulate.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
 * this is a content block in the browser
 *
 * A Content Block is a standalone unit of content, with it's own definition of
 * 1. content items
 * 2. template
 * + some other stuff
 *
 * it should be able to render itself
 */
(function () {
    var cbm = $2sxc._contentBlock;
    //#region functions working only with what they are given
    // 2017-08-27 2dm: I'm working on cleaning up this code, and an important part 
    // is to have code which doesn't use old state (like object-properties initialized earlier)
    // extracting these methods is part of the work
    /**
     * TODO - unclear if still in use
     * @param {object} sxc
     * @param {boolean} state
     * @returns {promise}
     */
    // 2017-09-02 2dm removed, deprecated, it's not stored on the server any more
    //cbm.setTemplateChooserState = function(sxc, state) {
    //    return sxc.webApi.get({
    //        url: "view/module/SetTemplateChooserState",
    //        params: { state: state }
    //    });
    //};
    /**
     * Save the template configuration for this instance
     * @param {object} sxc
     * @param {int} templateId
     * @param {boolean} [forceCreateContentGroup]
     * @returns {promise}
     */
    cbm.saveTemplate = function (sxc, templateId, forceCreateContentGroup) {
        return sxc.webApi.get({
            url: "view/module/savetemplateid",
            params: {
                templateId: templateId,
                forceCreateContentGroup: forceCreateContentGroup,
                newTemplateChooserState: false
            }
        });
    };
    /**
     * Retrieve the preview from the web-api
     * @param {object} sxc
     * @param {int} templateId
     * @returns {promise} promise with the html in the result
     */
    cbm.getPreviewWithTemplate = function (sxc, templateId) {
        var ec = sxc.manage._editContext;
        templateId = templateId || -1; // fallback, meaning use saved ID
        return sxc.webApi.get({
            url: "view/module/rendertemplate",
            params: {
                templateId: templateId,
                lang: ec.Language.Current,
                cbisentity: ec.ContentBlock.IsEntity,
                cbid: ec.ContentBlock.Id,
                originalparameters: JSON.stringify(ec.Environment.parameters)
            },
            dataType: "html"
        });
    };
    //#endregion
})();
//# sourceMappingURL=contentBlock.webApiPromises.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
var $2sxcActionMenuMapper = function (moduleId) {
    var run = $2sxc(moduleId).manage.run;
    return {
        changeLayoutOrContent: function () { run("layout"); },
        addItem: function () { run("add", { useModuleList: true, sortOrder: 0 }); },
        edit: function () { run("edit", { useModuleList: true, sortOrder: 0 }); },
        adminApp: function () { run("app"); },
        adminZone: function () { run("zone"); },
        develop: function () { run("template-develop"); },
    };
};
//# sourceMappingURL=dnn-inpage-edit.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// The following script fixes a bug in DNN 08.00.04
// the bug tries to detect a module-ID based on classes in a tag, 
// but uses a bad regex and captures the number 2 on all 2sxc-modules 
// instead of the real id
// this patch changes the order of the className of 2sxc modules when
// they are accessed through '$.fn.attr'
// 'DnnModule-2sxc DnnModule-xxx' -> DNN thinks the mod id is 2 (false)
// 'DnnModule-xxx DnnModule-2sxc' -> DNN thinks the mod id is xxx (correct)
// documented here https://github.com/2sic/2sxc/issues/986
(function () {
    var fn = $.fn.attr;
    $.fn.attr = function () {
        var val = fn.apply(this, arguments);
        if (arguments[0] !== "class"
            || typeof val !== "string"
            || val.search("DnnModule-2sxc ") === -1)
            return val;
        return val.replace("DnnModule-2sxc ", "") + " DnnModule-2sxc";
    };
})();
//# sourceMappingURL=dnn-08.00.04.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports) {

(function () {
    $2sxc._lib = {
        extend: function extend() {
            for (var i = 1; i < arguments.length; i++)
                for (var key in arguments[i])
                    if (arguments[i].hasOwnProperty(key))
                        arguments[0][key] = arguments[i][key];
            return arguments[0];
        }
    };
})();
//# sourceMappingURL=2sxc._lib.extend.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// A helper-controller in charge of opening edit-dialogs + creating the toolbars for it
// all in-page toolbars etc.
// if loaded, it's found under the $2sxc(module).manage
// it has commands to
// - getButton
// - getToolbar
// - run(...)
// - isEditMode
(function () {
    $2sxc._manage = {};
})();
//# sourceMappingURL=manage.{}.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function () {
    var mngApi = $2sxc._manage;
    /**
     * Get a html tag of the current sxc instance
     * @param {any} sxci
     * @return {jquery} - resulting html
     */
    $2sxc._manage.getTag = function (sxci) {
        return $("div[data-cb-id='" + sxci.cbid + "']")[0];
    };
    /**
     * get the edit-context object (a json object) of the current tag/sxc-instance
     * @param {any} htmlTag
     * @return {any} edit-context object
     */
    $2sxc._manage.getEditContextOfTag = function getEditContextOfTag(htmlTag) {
        var attr = htmlTag.getAttribute("data-edit-context");
        return JSON.parse(attr || "");
    };
    /**
     * get edit-context info of an sxc-object
     * @param {any} sxc
     * @return {any} edit context info
     */
    $2sxc._manage.getEditContext = function getEditContext(sxc) {
        return $2sxc._manage.getEditContextOfTag(mngApi.getTag(sxc));
    };
    /**
     * builds a config object used in the toolbar system
     * @param {any} editContext
     * @returns {any} object containing various properties for this current sxc-instance
     */
    $2sxc._manage.buildInstanceConfig = function (editContext) {
        var ce = editContext.Environment, cg = editContext.ContentGroup, cb = editContext.ContentBlock;
        return {
            portalId: ce.WebsiteId,
            tabId: ce.PageId,
            moduleId: ce.InstanceId,
            version: ce.SxcVersion,
            contentGroupId: cg.Guid,
            cbIsEntity: cb.IsEntity,
            cbId: cb.Id,
            appPath: cg.AppUrl,
            isList: cg.IsList
        };
    };
    $2sxc._manage.getUserOfEditContext = function getUserOfEditContext(editContext) {
        return { canDesign: editContext.User.CanDesign, canDevelop: editContext.User.CanDesign };
    };
    /**
     * create a config-object for the quick-dialog, with all settings which the quick-dialog will need
     * @param {any} editContext
     * @returns {any}
     */
    $2sxc._manage.buildQuickDialogConfig = function buildQuickDialogConfig(editContext) {
        return {
            appId: editContext.ContentGroup.AppId,
            isContent: editContext.ContentGroup.IsContent,
            hasContent: editContext.ContentGroup.HasContent,
            isList: editContext.ContentGroup.IsList,
            templateId: editContext.ContentGroup.TemplateId,
            contentTypeId: editContext.ContentGroup.ContentTypeName,
            templateChooserVisible: editContext.ContentBlock.ShowTemplatePicker,
            user: $2sxc._manage.getUserOfEditContext(editContext),
            supportsAjax: editContext.ContentGroup.SupportsAjax
        };
    };
    /**
        * get all parameters needed by NG dialogs from an sxc
        * @param {any} sxc
        * @param {any} [editContext]
        * @return {any} special object containing the ng-dialog parameters
        */
    $2sxc._manage.buildNgDialogParams = function buildNgDialogParams(sxc, editContext) {
        if (!editContext)
            editContext = mngApi.getEditContext(sxc);
        return {
            zoneId: editContext.ContentGroup.ZoneId,
            appId: editContext.ContentGroup.AppId,
            tid: editContext.Environment.PageId,
            mid: editContext.Environment.InstanceId,
            cbid: sxc.cbid,
            lang: editContext.Language.Current,
            langpri: editContext.Language.Primary,
            langs: JSON.stringify(editContext.Language.All),
            portalroot: editContext.Environment.WebsiteUrl,
            websiteroot: editContext.Environment.SxcRootUrl,
            partOfPage: editContext.ContentBlock.PartOfPage,
            //versioningRequirements: editContext.ContentBlock.VersioningRequirements,
            publishing: editContext.ContentBlock.VersioningRequirements,
            // todo: probably move the user into the dashboard info
            user: $2sxc._manage.getUserOfEditContext(editContext),
            approot: editContext.ContentGroup.AppUrl || null // this is the only value which doesn't have a slash by default.  note that the app-root doesn't exist when opening "manage-app"
        };
    };
})();
//# sourceMappingURL=manage.api.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// A helper-controller in charge of opening edit-dialogs + creating the toolbars for it
// all in-page toolbars etc.
// if loaded, it's found under the $2sxc(module).manage
// it has commands to
// - getButton
// - getToolbar
// - run(...)
// - isEditMode
(function () {
    $2sxc._manage.initInstance = function (sxc) {
        try {
            initInstance(sxc);
        }
        catch (e) {
            console.error("error in 2sxc - will log but not throw", e);
        }
    };
    var mngApi = $2sxc._manage;
    function initInstance(sxc) {
        var editContext = mngApi.getEditContext(sxc);
        var userInfo = mngApi.getUserOfEditContext(editContext);
        var cmdEngine = $2sxc._commands.instanceEngine(sxc, editContext);
        var editManager = sxc.manage = {
            //#region Official, public properties and commands, which are stable for use from the outside
            /**
             * run a command - often used in toolbars and custom buttons
             */
            run: cmdEngine.executeAction,
            /**
             * Generate a button (an <a>-tag) for one specific toolbar-action.
             * @param {Object<any>} actDef - settings, an object containing the specs for the expected buton
             * @param {int} groupIndex - number what button-group it's in'
             * @returns {string} html of a button
             */
            getButton: function (actDef, groupIndex) {
                return $2sxc._toolbarManager.generateButtonHtml(sxc, actDef, groupIndex);
            },
            /**
             * Builds the toolbar and returns it as HTML
             * @param {Object<any>} tbConfig - general toolbar config
             * @param {Object<any>} moreSettings - additional / override settings
             * @returns {string} html of the current toolbar
             */
            getToolbar: function (tbConfig, moreSettings) {
                return $2sxc._toolbarManager.generateToolbarHtml(sxc, tbConfig, moreSettings);
            },
            //#endregion official, public properties - everything below this can change at any time
            // internal method to find out if it's in edit-mode
            _isEditMode: function () { return editContext.Environment.IsEditable; },
            _reloadWithAjax: editContext.ContentGroup.SupportsAjax,
            _dialogParameters: mngApi.buildNgDialogParams(sxc, editContext),
            _instanceConfig: mngApi.buildInstanceConfig(editContext),
            _editContext: editContext,
            _quickDialogConfig: mngApi.buildQuickDialogConfig(editContext),
            _commands: cmdEngine,
            _user: userInfo,
            // init this object 
            init: function init() {
                // enhance UI in case there are known errors / issues
                if (editContext.error.type)
                    editManager._handleErrors(editContext.error.type, $2sxc._manage.getTag(sxc));
                // todo: move this to dialog-handling
                // display the dialog
                var openDialogId = sessionStorage.getItem("dia-cbid");
                if (editContext.error.type || !openDialogId || openDialogId !== sxc.cbid)
                    return false;
                sessionStorage.removeItem("dia-cbid");
                editManager.run("layout");
            },
            // private: show error when the app-data hasn't been installed yet for this imported-module
            _handleErrors: function (errType, cbTag) {
                var errWrapper = $("<div class=\"dnnFormMessage dnnFormWarning sc-element\"></div>");
                var msg = "";
                var toolbar = $("<ul class='sc-menu'></ul>");
                if (errType === "DataIsMissing") {
                    msg = "Error: System.Exception: Data is missing - usually when a site is copied but the content / apps have not been imported yet - check 2sxc.org/help?tag=export-import";
                    toolbar.attr("data-toolbar", '[{\"action\": \"zone\"}, {\"action\": \"more\"}]');
                }
                errWrapper.append(msg);
                errWrapper.append(toolbar);
                $(cbTag).append(errWrapper);
            },
            // change config by replacing the guid, and refreshing dependend sub-objects
            _updateContentGroupGuid: function (newGuid) {
                editContext.ContentGroup.Guid = newGuid;
                editManager._instanceConfig = mngApi.buildInstanceConfig(editContext);
            },
            _getCbManipulator: function () {
                return $2sxc._contentBlock.manipulator(sxc);
            }
        };
        editManager.init();
        return editManager;
    }
})();
//# sourceMappingURL=manage.create.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Author: Alex Gibson
 * https://github.com/alexgibson/shake.js
 * License: MIT license
 */

(function(global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
            return factory(global, global.document);
        }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(global, global.document);
    } else {
        global.Shake = factory(global, global.document);
    }
} (typeof window !== 'undefined' ? window : this, function (window, document) {

    'use strict';

    function Shake(options) {
        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;

        this.options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 1000,
            callback: null // callback - will only be used if provided, otherwise generate event // function() {}//default interval between events
        };

        if (typeof options === 'object') {
            for (var i in options) {
                if (options.hasOwnProperty(i)) {
                    this.options[i] = options[i];
                }
            }
        }

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        var currentTime;
        var timeDifference;
        var deltaX = 0;
        var deltaY = 0;
        var deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();
            
            if (timeDifference > this.options.timeout) {
                // once triggered, execute  the callback
                if( typeof this.options.callback === 'function' ) {
                    this.options.callback();
                }
                else
                    console.log("shake event without callback detected");
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;
    };

    //event handler
    Shake.prototype.handleEvent = function (e) {
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    return Shake;
}));


/***/ }),
/* 15 */
/***/ (function(module, exports) {

(function () {
    // prevent propagation of the click (if menu was clicked)
    $($2sxc.c.sel.scMenu /*".sc-menu"*/).click(function (e) {
        e.stopPropagation();
    });
})();
//# sourceMappingURL=toolbar-events.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.
(function () {
    /**
     * Toolbar manager for the whole page - basically a set of APIs
     */
    $2sxc._toolbarManager = {
        // internal constants
        cDisableAttrName: "data-disable-toolbar"
    };
})();
//# sourceMappingURL=toolbarManager.{}.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports) {

(function () {
    $2sxc._toolbarManager.generateButtonHtml = generateButtonHtml;
    return;
    // does some clean-up work on a button-definition object
    // because the target item could be specified directly, or in a complex internal object called entity
    function flattenActionDefinition(actDef) {
        if (!actDef.entity || !actDef.entity._2sxcEditInformation)
            return;
        var editInfo = actDef.entity._2sxcEditInformation;
        actDef.useModuleList = (editInfo.sortOrder !== undefined); // has sort-order, so use list
        if (editInfo.entityId !== undefined)
            actDef.entityId = editInfo.entityId;
        if (editInfo.sortOrder !== undefined)
            actDef.sortOrder = editInfo.sortOrder;
        delete actDef.entity; // clean up edit-info
    }
    // generate the html for a button
    // Expects: instance sxc, action-definition, + group-index in which the button is shown
    function generateButtonHtml(sxc, actDef, groupIndex) {
        // if the button belongs to a content-item, move the specs up to the item into the settings-object
        flattenActionDefinition(actDef);
        // retrieve configuration for this button
        var showClasses = "group-" + groupIndex + (actDef.disabled ? " disabled" : ""), classesList = (actDef.classes || "").split(","), box = $("<div/>"), symbol = $("<i class=\"" + actDef.icon + "\" aria-hidden=\"true\"></i>"), onclick = actDef.disabled ?
            "" :
            "$2sxc(" + sxc.id + ", " + sxc.cbid + ").manage.run(" + JSON.stringify(actDef.command) + ", event);";
        for (var c = 0; c < classesList.length; c++)
            showClasses += " " + classesList[c];
        var button = $("<a />", {
            'class': "sc-" + actDef.action + " " + showClasses +
                (actDef.dynamicClasses ? " " + actDef.dynamicClasses(actDef) : ""),
            'onclick': onclick,
            'data-i18n': "[title]" + actDef.title
        });
        button.html(box.html(symbol));
        return button[0].outerHTML;
    }
})();
//# sourceMappingURL=toolbarManager.generateButtonHtml.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports) {

(function () {
    var tbManager = $2sxc._toolbarManager;
    $2sxc._toolbarManager.generateToolbarHtml = generateToolbarHtml;
    return;
    function generateToolbarHtml(sxc, tbConfig, moreSettings) {
        // if it has an action or is an array, keep that. Otherwise get standard buttons
        tbConfig = tbConfig || {}; // if null/undefined, use empty object
        var btnList = tbConfig;
        if (!tbConfig.action && !tbConfig.groups && !tbConfig.buttons && !Array.isArray(tbConfig))
            btnList = tbManager.standardButtons(sxc.manage._user.canDesign /* editContext.User.CanDesign */, tbConfig);
        // whatever we had, if more settings were provided, override with these...
        var tlbDef = tbManager.buttonHelpers.buildFullDefinition(btnList, sxc.manage._commands.commands, sxc.manage._instanceConfig /* tb.config */, moreSettings);
        var btnGroups = tlbDef.groups;
        var behaviourClasses = " sc-tb-hover-" + tlbDef.settings.hover + " sc-tb-show-" + tlbDef.settings.show;
        // todo: these settings assume it's not in an array...
        var tbClasses = "sc-menu group-0 " + behaviourClasses + " " +
            ((tbConfig.sortOrder === -1) ? " listContent" : "") +
            (tlbDef.settings.classes ? " " + tlbDef.settings.classes : "");
        var toolbar = $("<ul />", {
            'class': tbClasses,
            'onclick': "var e = arguments[0] || window.event; e.stopPropagation();"
        });
        for (var i = 0; i < btnGroups.length; i++) {
            var btns = btnGroups[i].buttons;
            for (var h = 0; h < btns.length; h++)
                toolbar.append($("<li />").append($(tbManager.generateButtonHtml(sxc, btns[h], i))));
        }
        toolbar.attr("group-count", btnGroups.length);
        return toolbar[0].outerHTML;
    }
})();
//# sourceMappingURL=toolbarManager.generateToolbarHtml.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.
(function () {
    $2sxc._toolbarManager.standardButtons = standardButtons;
    return;
    function standardButtons(canDesign, sharedParameters) {
        // create a deep-copy of the original object
        var btns = $.extend(true, {}, $2sxc._toolbarManager.toolbarTemplate);
        btns.params = sharedParameters && (Array.isArray(sharedParameters) && sharedParameters[0]) || sharedParameters;
        if (!canDesign)
            btns.groups.splice(2, 1); // remove this menu
        return btns;
    }
})();
//# sourceMappingURL=toolbarManager.standardButtons.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// the default / initial buttons in a standard toolbar
(function () {
    // ToDo: refactor to avoid side-effects
    $2sxc._toolbarManager.toolbarTemplate = {
        groups: [
            // ToDo: remove dead code
            //{
            //    name: "test",
            //    buttons: [
            //        {
            //            action: "edit",
            //            icon: "icon-sxc-code",
            //            title: "just quick edit!"
            //        },
            //        "inexisting-action",
            //        "edit",
            //        {
            //            action: "publish",
            //            showCondition: true,
            //            title: "forced publish button"
            //        },
            //        {
            //            command: {
            //                action: "custom",
            //                customCode: "alert('custom button!')"
            //            }
            //        },
            //        "more"
            //    ]
            //},
            {
                name: "default",
                buttons: "edit,new,metadata,publish,layout"
            }, {
                name: "list",
                buttons: "add,remove,moveup,movedown,instance-list,replace,item-history"
            }, {
                name: "data",
                buttons: "delete"
            }, {
                name: "instance",
                buttons: "template-develop,template-settings,contentitems,template-query,contenttype",
                defaults: {
                    classes: "group-pro"
                }
            }, {
                name: "app",
                buttons: "app,app-settings,app-resources,zone",
                defaults: {
                    classes: "group-pro"
                }
            }
        ],
        defaults: {},
        params: {},
        settings: {
            autoAddMore: "right",
        }
    };
})();
//# sourceMappingURL=toolbarManager.toolbarTemplate.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
(function () {
    $2sxc.translate = function (key) {
        // return key;
        return ($.t && $.t(key)) || key;
    };
})();
//# sourceMappingURL=2sxc.translate.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("i18next",t):e.i18next=t()}(this,function(){"use strict";function e(e){return null==e?"":""+e}function t(e,t,n){e.forEach(function(e){t[e]&&(n[e]=t[e])})}function n(e,t,n){function o(e){return e&&e.indexOf("###")>-1?e.replace(/###/g,"."):e}for(var r="string"!=typeof t?[].concat(t):t.split(".");r.length>1;){if(!e)return{};var i=o(r.shift());!e[i]&&n&&(e[i]=new n),e=e[i]}return e?{obj:e,k:o(r.shift())}:{}}function o(e,t,o){var r=n(e,t,Object),i=r.obj,s=r.k;i[s]=o}function r(e,t,o,r){var i=n(e,t,Object),s=i.obj,a=i.k;s[a]=s[a]||[],r&&(s[a]=s[a].concat(o)),r||s[a].push(o)}function i(e,t){var o=n(e,t),r=o.obj,i=o.k;return r?r[i]:void 0}function s(e,t,n){for(var o in t)o in e?"string"==typeof e[o]||e[o]instanceof String||"string"==typeof t[o]||t[o]instanceof String?n&&(e[o]=t[o]):s(e[o],t[o],n):e[o]=t[o];return e}function a(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}function l(e){return"string"==typeof e?e.replace(/[&<>"'\/]/g,function(e){return C[e]}):e}function u(e){return e.interpolation={unescapeSuffix:"HTML"},e.interpolation.prefix=e.interpolationPrefix||"__",e.interpolation.suffix=e.interpolationSuffix||"__",e.interpolation.escapeValue=e.escapeInterpolation||!1,e.interpolation.nestingPrefix=e.reusePrefix||"$t(",e.interpolation.nestingSuffix=e.reuseSuffix||")",e}function c(e){return e.resStore&&(e.resources=e.resStore),e.ns&&e.ns.defaultNs?(e.defaultNS=e.ns.defaultNs,e.ns=e.ns.namespaces):e.defaultNS=e.ns||"translation",e.fallbackToDefaultNS&&e.defaultNS&&(e.fallbackNS=e.defaultNS),e.saveMissing=e.sendMissing,e.saveMissingTo=e.sendMissingTo||"current",e.returnNull=!e.fallbackOnNull,e.returnEmptyString=!e.fallbackOnEmpty,e.returnObjects=e.returnObjectTrees,e.joinArrays="\n",e.returnedObjectHandler=e.objectTreeKeyHandler,e.parseMissingKeyHandler=e.parseMissingKey,e.appendNamespaceToMissingKey=!0,e.nsSeparator=e.nsseparator,e.keySeparator=e.keyseparator,"sprintf"===e.shortcutFunction&&(e.overloadTranslationOptionHandler=function(e){for(var t=[],n=1;n<e.length;n++)t.push(e[n]);return{postProcess:"sprintf",sprintf:t}}),e.whitelist=e.lngWhitelist,e.preload=e.preload,"current"===e.load&&(e.load="currentOnly"),"unspecific"===e.load&&(e.load="languageOnly"),e.backend=e.backend||{},e.backend.loadPath=e.resGetPath||"locales/__lng__/__ns__.json",e.backend.addPath=e.resPostPath||"locales/add/__lng__/__ns__",e.backend.allowMultiLoading=e.dynamicLoad,e.cache=e.cache||{},e.cache.prefix="res_",e.cache.expirationTime=6048e5,e.cache.enabled=!!e.useLocalStorage,e=u(e),e.defaultVariables&&(e.interpolation.defaultVariables=e.defaultVariables),e}function p(e){return e=u(e),e.joinArrays="\n",e}function f(e){return(e.interpolationPrefix||e.interpolationSuffix||e.escapeInterpolation)&&(e=u(e)),e.nsSeparator=e.nsseparator,e.keySeparator=e.keyseparator,e.returnObjects=e.returnObjectTrees,e}function h(e){e.lng=function(){return S.deprecate("i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup."),e.services.languageUtils.toResolveHierarchy(e.language)[0]},e.preload=function(t,n){S.deprecate("i18next.preload() can be replaced with i18next.loadLanguages()"),e.loadLanguages(t,n)},e.setLng=function(t,n,o){return S.deprecate("i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace."),"function"==typeof n&&(o=n,n={}),n||(n={}),n.fixLng===!0&&o?o(null,e.getFixedT(t)):void e.changeLanguage(t,o)},e.addPostProcessor=function(t,n){S.deprecate("i18next.addPostProcessor() can be replaced by i18next.use({ type: 'postProcessor', name: 'name', process: fc })"),e.use({type:"postProcessor",name:t,process:n})}}function g(e){return e.charAt(0).toUpperCase()+e.slice(1)}function d(){var e={};return R.forEach(function(t){t.lngs.forEach(function(n){return e[n]={numbers:t.nr,plurals:P[t.fc]}})}),e}function v(e,t){for(var n=e.indexOf(t);-1!==n;)e.splice(n,1),n=e.indexOf(t)}function y(){return{debug:!1,ns:["translation"],defaultNS:["translation"],fallbackLng:["dev"],fallbackNS:!1,whitelist:!1,load:"all",preload:!1,keySeparator:".",nsSeparator:":",pluralSeparator:"_",contextSeparator:"_",saveMissing:!1,saveMissingTo:"fallback",missingKeyHandler:!1,postProcess:!1,returnNull:!0,returnEmptyString:!0,returnObjects:!1,joinArrays:!1,returnedObjectHandler:function(){},parseMissingKeyHandler:!1,appendNamespaceToMissingKey:!1,overloadTranslationOptionHandler:function(e){return{defaultValue:e[1]}},interpolation:{escapeValue:!0,prefix:"{{",suffix:"}}",unescapePrefix:"-",nestingPrefix:"$t(",nestingSuffix:")",defaultVariables:void 0}}}function b(e){return"string"==typeof e.ns&&(e.ns=[e.ns]),"string"==typeof e.fallbackLng&&(e.fallbackLng=[e.fallbackLng]),"string"==typeof e.fallbackNS&&(e.fallbackNS=[e.fallbackNS]),e.whitelist&&e.whitelist.indexOf("cimode")<0&&e.whitelist.push("cimode"),e}var m={};m["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},m.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},m["extends"]=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},m.inherits=function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)},m.possibleConstructorReturn=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},m.slicedToArray=function(){function e(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var s,a=e[Symbol.iterator]();!(o=(s=a.next()).done)&&(n.push(s.value),!t||n.length!==t);o=!0);}catch(l){r=!0,i=l}finally{try{!o&&a["return"]&&a["return"]()}finally{if(r)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();var x={type:"logger",log:function(e){this._output("log",e)},warn:function(e){this._output("warn",e)},error:function(e){this._output("error",e)},_output:function(e,t){console&&console[e]&&console[e].apply(console,Array.prototype.slice.call(t))}},k=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,e),this.subs=[],this.init(t,n)}return e.prototype.init=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.prefix=t.prefix||"i18next:",this.logger=e||x,this.options=t,this.debug=t.debug!==!1},e.prototype.setDebug=function(e){this.debug=e,this.subs.forEach(function(t){t.setDebug(e)})},e.prototype.log=function(){this.forward(arguments,"log","",!0)},e.prototype.warn=function(){this.forward(arguments,"warn","",!0)},e.prototype.error=function(){this.forward(arguments,"error","")},e.prototype.deprecate=function(){this.forward(arguments,"warn","WARNING DEPRECATED: ",!0)},e.prototype.forward=function(e,t,n,o){o&&!this.debug||("string"==typeof e[0]&&(e[0]=n+this.prefix+" "+e[0]),this.logger[t](e))},e.prototype.create=function(t){var n=new e(this.logger,m["extends"]({prefix:this.prefix+":"+t+":"},this.options));return this.subs.push(n),n},e}(),S=new k,w=function(){function e(){m.classCallCheck(this,e),this.observers={}}return e.prototype.on=function(e,t){var n=this;e.split(" ").forEach(function(e){n.observers[e]=n.observers[e]||[],n.observers[e].push(t)})},e.prototype.off=function(e,t){var n=this;this.observers[e]&&this.observers[e].forEach(function(){if(t){var o=n.observers[e].indexOf(t);o>-1&&n.observers[e].splice(o,1)}else delete n.observers[e]})},e.prototype.emit=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),o=1;t>o;o++)n[o-1]=arguments[o];this.observers[e]&&this.observers[e].forEach(function(e){e.apply(void 0,n)}),this.observers["*"]&&this.observers["*"].forEach(function(t){var o;t.apply(t,(o=[e]).concat.apply(o,n))})},e}(),C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},L=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments.length<=1||void 0===arguments[1]?{ns:["translation"],defaultNS:"translation"}:arguments[1];m.classCallCheck(this,t);var r=m.possibleConstructorReturn(this,e.call(this));return r.data=n,r.options=o,r}return m.inherits(t,e),t.prototype.addNamespaces=function(e){this.options.ns.indexOf(e)<0&&this.options.ns.push(e)},t.prototype.removeNamespaces=function(e){var t=this.options.ns.indexOf(e);t>-1&&this.options.ns.splice(t,1)},t.prototype.getResource=function(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?{}:arguments[3],r=o.keySeparator||this.options.keySeparator;void 0===r&&(r=".");var s=[e,t];return n&&"string"!=typeof n&&(s=s.concat(n)),n&&"string"==typeof n&&(s=s.concat(r?n.split(r):n)),e.indexOf(".")>-1&&(s=e.split(".")),i(this.data,s)},t.prototype.addResource=function(e,t,n,r){var i=arguments.length<=4||void 0===arguments[4]?{silent:!1}:arguments[4],s=this.options.keySeparator;void 0===s&&(s=".");var a=[e,t];n&&(a=a.concat(s?n.split(s):n)),e.indexOf(".")>-1&&(a=e.split("."),r=t,t=a[1]),this.addNamespaces(t),o(this.data,a,r),i.silent||this.emit("added",e,t,n,r)},t.prototype.addResources=function(e,t,n){for(var o in n)"string"==typeof n[o]&&this.addResource(e,t,o,n[o],{silent:!0});this.emit("added",e,t,n)},t.prototype.addResourceBundle=function(e,t,n,r,a){var l=[e,t];e.indexOf(".")>-1&&(l=e.split("."),r=n,n=t,t=l[1]),this.addNamespaces(t);var u=i(this.data,l)||{};r?s(u,n,a):u=m["extends"]({},u,n),o(this.data,l,u),this.emit("added",e,t,n)},t.prototype.removeResourceBundle=function(e,t){this.hasResourceBundle(e,t)&&delete this.data[e][t],this.removeNamespaces(t),this.emit("removed",e,t)},t.prototype.hasResourceBundle=function(e,t){return void 0!==this.getResource(e,t)},t.prototype.getResourceBundle=function(e,t){return t||(t=this.options.defaultNS),"v1"===this.options.compatibilityAPI?m["extends"]({},this.getResource(e,t)):this.getResource(e,t)},t.prototype.toJSON=function(){return this.data},t}(w),N={processors:{},addPostProcessor:function(e){this.processors[e.name]=e},handle:function(e,t,n,o,r){var i=this;return e.forEach(function(e){i.processors[e]&&(t=i.processors[e].process(t,n,o,r))}),t}},O=function(e){function n(o){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,n);var i=m.possibleConstructorReturn(this,e.call(this));return t(["resourceStore","languageUtils","pluralResolver","interpolator","backendConnector"],o,i),i.options=r,i.logger=S.create("translator"),i}return m.inherits(n,e),n.prototype.changeLanguage=function(e){e&&(this.language=e)},n.prototype.exists=function(e){var t=arguments.length<=1||void 0===arguments[1]?{interpolation:{}}:arguments[1];return"v1"===this.options.compatibilityAPI&&(t=f(t)),void 0!==this.resolve(e,t)},n.prototype.extractFromKey=function(e,t){var n=t.nsSeparator||this.options.nsSeparator;void 0===n&&(n=":");var o=t.ns||this.options.defaultNS;if(n&&e.indexOf(n)>-1){var r=e.split(n);o=r[0],e=r[1]}return"string"==typeof o&&(o=[o]),{key:e,namespaces:o}},n.prototype.translate=function(e){var t=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if("object"!==("undefined"==typeof t?"undefined":m["typeof"](t))?t=this.options.overloadTranslationOptionHandler(arguments):"v1"===this.options.compatibilityAPI&&(t=f(t)),void 0===e||null===e||""===e)return"";"number"==typeof e&&(e=String(e)),"string"==typeof e&&(e=[e]);var n=t.lng||this.language;if(n&&"cimode"===n.toLowerCase())return e[e.length-1];var o=t.keySeparator||this.options.keySeparator||".",r=this.extractFromKey(e[e.length-1],t),i=r.key,s=r.namespaces,a=s[s.length-1],l=this.resolve(e,t),u=Object.prototype.toString.apply(l),c=["[object Number]","[object Function]","[object RegExp]"],p=void 0!==t.joinArrays?t.joinArrays:this.options.joinArrays;if(l&&"string"!=typeof l&&c.indexOf(u)<0&&(!p||"[object Array]"!==u)){if(!t.returnObjects&&!this.options.returnObjects)return this.logger.warn("accessing an object - but returnObjects options is not enabled!"),this.options.returnedObjectHandler?this.options.returnedObjectHandler(i,l,t):"key '"+i+" ("+this.language+")' returned an object instead of string.";var h="[object Array]"===u?[]:{};for(var g in l)h[g]=this.translate(""+i+o+g,m["extends"]({joinArrays:!1,ns:s},t));l=h}else if(p&&"[object Array]"===u)l=l.join(p),l&&(l=this.extendTranslation(l,i,t));else{var d=!1,v=!1;if(!this.isValidLookup(l)&&t.defaultValue&&(d=!0,l=t.defaultValue),this.isValidLookup(l)||(v=!0,l=i),(v||d)&&(this.logger.log("missingKey",n,a,i,l),this.options.saveMissing)){var y=[];if("fallback"===this.options.saveMissingTo&&this.options.fallbackLng&&this.options.fallbackLng[0])for(var b=0;b<this.options.fallbackLng.length;b++)y.push(this.options.fallbackLng[b]);else"all"===this.options.saveMissingTo?y=this.languageUtils.toResolveHierarchy(t.lng||this.language):y.push(t.lng||this.language);this.options.missingKeyHandler?this.options.missingKeyHandler(y,a,i,l):this.backendConnector&&this.backendConnector.saveMissing&&this.backendConnector.saveMissing(y,a,i,l),this.emit("missingKey",y,a,i,l)}l=this.extendTranslation(l,i,t),v&&l===i&&this.options.appendNamespaceToMissingKey&&(l=a+":"+i),v&&this.options.parseMissingKeyHandler&&(l=this.options.parseMissingKeyHandler(l))}return l},n.prototype.extendTranslation=function(e,t,n){var o=this;n.interpolation&&this.interpolator.init(n);var r=n.replace&&"string"!=typeof n.replace?n.replace:n;this.options.interpolation.defaultVariables&&(r=m["extends"]({},this.options.interpolation.defaultVariables,r)),e=this.interpolator.interpolate(e,r),e=this.interpolator.nest(e,function(){for(var e=arguments.length,t=Array(e),n=0;e>n;n++)t[n]=arguments[n];return o.translate.apply(o,t)},n),n.interpolation&&this.interpolator.reset();var i=n.postProcess||this.options.postProcess,s="string"==typeof i?[i]:i;return void 0!==e&&s&&s.length&&n.applyPostProcessor!==!1&&(e=N.handle(s,e,t,n,this)),e},n.prototype.resolve=function(e){var t=this,n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=void 0;return"string"==typeof e&&(e=[e]),e.forEach(function(e){if(!t.isValidLookup(o)){var r=t.extractFromKey(e,n),i=r.key,s=r.namespaces;t.options.fallbackNS&&(s=s.concat(t.options.fallbackNS));var a=void 0!==n.count&&"string"!=typeof n.count,l=void 0!==n.context&&"string"==typeof n.context&&""!==n.context,u=n.lngs?n.lngs:t.languageUtils.toResolveHierarchy(n.lng||t.language);s.forEach(function(e){t.isValidLookup(o)||u.forEach(function(r){if(!t.isValidLookup(o)){var s=i,u=[s],c=void 0;a&&(c=t.pluralResolver.getSuffix(r,n.count)),a&&l&&u.push(s+c),l&&u.push(s+=""+t.options.contextSeparator+n.context),a&&u.push(s+=c);for(var p=void 0;p=u.pop();)t.isValidLookup(o)||(o=t.getResource(r,e,p,n))}})})}}),o},n.prototype.isValidLookup=function(e){return!(void 0===e||!this.options.returnNull&&null===e||!this.options.returnEmptyString&&""===e)},n.prototype.getResource=function(e,t,n){var o=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];return this.resourceStore.getResource(e,t,n,o)},n}(w),j=function(){function e(t){m.classCallCheck(this,e),this.options=t,this.whitelist=this.options.whitelist||!1,this.logger=S.create("languageUtils")}return e.prototype.getLanguagePartFromCode=function(e){if(e.indexOf("-")<0)return e;var t=["NB-NO","NN-NO","nb-NO","nn-NO","nb-no","nn-no"],n=e.split("-");return this.formatLanguageCode(t.indexOf(e)>-1?n[1].toLowerCase():n[0])},e.prototype.formatLanguageCode=function(e){if("string"==typeof e&&e.indexOf("-")>-1){var t=["hans","hant","latn","cyrl","cans","mong","arab"],n=e.split("-");return this.options.lowerCaseLng?n=n.map(function(e){return e.toLowerCase()}):2===n.length?(n[0]=n[0].toLowerCase(),n[1]=n[1].toUpperCase(),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=g(n[1].toLowerCase()))):3===n.length&&(n[0]=n[0].toLowerCase(),2===n[1].length&&(n[1]=n[1].toUpperCase()),"sgn"!==n[0]&&2===n[2].length&&(n[2]=n[2].toUpperCase()),t.indexOf(n[1].toLowerCase())>-1&&(n[1]=g(n[1].toLowerCase())),t.indexOf(n[2].toLowerCase())>-1&&(n[2]=g(n[2].toLowerCase()))),n.join("-")}return this.options.cleanCode||this.options.lowerCaseLng?e.toLowerCase():e},e.prototype.isWhitelisted=function(e){return"languageOnly"===this.options.load&&(e=this.getLanguagePartFromCode(e)),!this.whitelist||!this.whitelist.length||this.whitelist.indexOf(e)>-1},e.prototype.toResolveHierarchy=function(e,t){var n=this;t=t||this.options.fallbackLng||[],"string"==typeof t&&(t=[t]);var o=[],r=function(e){n.isWhitelisted(e)?o.push(e):n.logger.warn("rejecting non-whitelisted language code: "+e)};return"string"==typeof e&&e.indexOf("-")>-1?("languageOnly"!==this.options.load&&r(this.formatLanguageCode(e)),"currentOnly"!==this.options.load&&r(this.getLanguagePartFromCode(e))):"string"==typeof e&&r(this.formatLanguageCode(e)),t.forEach(function(e){o.indexOf(e)<0&&r(n.formatLanguageCode(e))}),o},e}(),R=[{lngs:["ach","ak","am","arn","br","fil","gun","ln","mfe","mg","mi","oc","tg","ti","tr","uz","wa"],nr:[1,2],fc:1},{lngs:["af","an","ast","az","bg","bn","ca","da","de","dev","el","en","eo","es","es_ar","et","eu","fi","fo","fur","fy","gl","gu","ha","he","hi","hu","hy","ia","it","kn","ku","lb","mai","ml","mn","mr","nah","nap","nb","ne","nl","nn","no","nso","pa","pap","pms","ps","pt","pt_br","rm","sco","se","si","so","son","sq","sv","sw","ta","te","tk","ur","yo"],nr:[1,2],fc:2},{lngs:["ay","bo","cgg","fa","id","ja","jbo","ka","kk","km","ko","ky","lo","ms","sah","su","th","tt","ug","vi","wo","zh"],nr:[1],fc:3},{lngs:["be","bs","dz","hr","ru","sr","uk"],nr:[1,2,5],fc:4},{lngs:["ar"],nr:[0,1,2,3,11,100],fc:5},{lngs:["cs","sk"],nr:[1,2,5],fc:6},{lngs:["csb","pl"],nr:[1,2,5],fc:7},{lngs:["cy"],nr:[1,2,3,8],fc:8},{lngs:["fr"],nr:[1,2],fc:9},{lngs:["ga"],nr:[1,2,3,7,11],fc:10},{lngs:["gd"],nr:[1,2,3,20],fc:11},{lngs:["is"],nr:[1,2],fc:12},{lngs:["jv"],nr:[0,1],fc:13},{lngs:["kw"],nr:[1,2,3,4],fc:14},{lngs:["lt"],nr:[1,2,10],fc:15},{lngs:["lv"],nr:[1,2,0],fc:16},{lngs:["mk"],nr:[1,2],fc:17},{lngs:["mnk"],nr:[0,1,2],fc:18},{lngs:["mt"],nr:[1,2,11,20],fc:19},{lngs:["or"],nr:[2,1],fc:2},{lngs:["ro"],nr:[1,2,20],fc:20},{lngs:["sl"],nr:[5,1,2,3],fc:21}],P={1:function(e){return Number(e>1)},2:function(e){return Number(1!=e)},3:function(e){return 0},4:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&4>=e%10&&(10>e%100||e%100>=20)?1:2)},5:function(e){return Number(0===e?0:1==e?1:2==e?2:e%100>=3&&10>=e%100?3:e%100>=11?4:5)},6:function(e){return Number(1==e?0:e>=2&&4>=e?1:2)},7:function(e){return Number(1==e?0:e%10>=2&&4>=e%10&&(10>e%100||e%100>=20)?1:2)},8:function(e){return Number(1==e?0:2==e?1:8!=e&&11!=e?2:3)},9:function(e){return Number(e>=2)},10:function(e){return Number(1==e?0:2==e?1:7>e?2:11>e?3:4)},11:function(e){return Number(1==e||11==e?0:2==e||12==e?1:e>2&&20>e?2:3)},12:function(e){return Number(e%10!=1||e%100==11)},13:function(e){return Number(0!==e)},14:function(e){return Number(1==e?0:2==e?1:3==e?2:3)},15:function(e){return Number(e%10==1&&e%100!=11?0:e%10>=2&&(10>e%100||e%100>=20)?1:2)},16:function(e){return Number(e%10==1&&e%100!=11?0:0!==e?1:2)},17:function(e){return Number(1==e||e%10==1?0:1)},18:function(e){return Number(0==e?0:1==e?1:2)},19:function(e){return Number(1==e?0:0===e||e%100>1&&11>e%100?1:e%100>10&&20>e%100?2:3)},20:function(e){return Number(1==e?0:0===e||e%100>0&&20>e%100?1:2)},21:function(e){return Number(e%100==1?1:e%100==2?2:e%100==3||e%100==4?3:0)}},E=function(){function e(t){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];m.classCallCheck(this,e),this.languageUtils=t,this.options=n,this.logger=S.create("pluralResolver"),this.rules=d()}return e.prototype.addRule=function(e,t){this.rules[e]=t},e.prototype.getRule=function(e){return this.rules[this.languageUtils.getLanguagePartFromCode(e)]},e.prototype.needsPlural=function(e){var t=this.getRule(e);return!(t&&t.numbers.length<=1)},e.prototype.getSuffix=function(e,t){var n=this.getRule(e);if(n){if(1===n.numbers.length)return"";var o=n.noAbs?n.plurals(t):n.plurals(Math.abs(t)),r=n.numbers[o];if(2===n.numbers.length&&1===n.numbers[0]&&(2===r?r="plural":1===r&&(r="")),"v1"===this.options.compatibilityJSON){if(1===r)return"";if("number"==typeof r)return"_plural_"+r.toString()}return this.options.prepend&&r.toString()?this.options.prepend+r.toString():r.toString()}return this.logger.warn("no plural rule found for: "+e),""},e}(),_=function(){function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];m.classCallCheck(this,t),this.logger=S.create("interpolator"),this.init(e,!0)}return t.prototype.init=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments[1];t&&(this.options=e),e.interpolation||(e.interpolation={escapeValue:!0});var n=e.interpolation;this.escapeValue=n.escapeValue,this.prefix=n.prefix?a(n.prefix):n.prefixEscaped||"{{",this.suffix=n.suffix?a(n.suffix):n.suffixEscaped||"}}",this.unescapePrefix=n.unescapeSuffix?"":n.unescapePrefix||"-",this.unescapeSuffix=this.unescapePrefix?"":n.unescapeSuffix||"",this.nestingPrefix=n.nestingPrefix?a(n.nestingPrefix):n.nestingPrefixEscaped||a("$t("),this.nestingSuffix=n.nestingSuffix?a(n.nestingSuffix):n.nestingSuffixEscaped||a(")");var o=this.prefix+"(.+?)"+this.suffix;this.regexp=new RegExp(o,"g");var r=this.prefix+this.unescapePrefix+"(.+?)"+this.unescapeSuffix+this.suffix;this.regexpUnescape=new RegExp(r,"g");var i=this.nestingPrefix+"(.+?)"+this.nestingSuffix;this.nestingRegexp=new RegExp(i,"g")},t.prototype.reset=function(){this.options&&this.init(this.options)},t.prototype.interpolate=function(t,n){function o(e){return e.replace(/\$/g,"$$$$")}for(var r=void 0,s=void 0;r=this.regexpUnescape.exec(t);){var a=i(n,r[1].trim());t=t.replace(r[0],a)}for(;r=this.regexp.exec(t);)s=i(n,r[1].trim()),"string"!=typeof s&&(s=e(s)),s||(this.logger.warn("missed to pass in variable "+r[1]+" for interpolating "+t),s=""),s=o(this.escapeValue?l(s):s),t=t.replace(r[0],s),this.regexp.lastIndex=0;return t},t.prototype.nest=function(t,n){function o(e){return e.replace(/\$/g,"$$$$")}function r(e){if(e.indexOf(",")<0)return e;var t=e.split(",");e=t.shift();var n=t.join(",");n=this.interpolate(n,u);try{u=JSON.parse(n)}catch(o){this.logger.error("failed parsing options string in nesting for key "+e,o)}return e}var i=arguments.length<=2||void 0===arguments[2]?{}:arguments[2],s=void 0,a=void 0,u=JSON.parse(JSON.stringify(i));for(u.applyPostProcessor=!1;s=this.nestingRegexp.exec(t);)a=n(r.call(this,s[1].trim()),u),"string"!=typeof a&&(a=e(a)),a||(this.logger.warn("missed to pass in variable "+s[1]+" for interpolating "+t),a=""),a=o(this.escapeValue?l(a):a),t=t.replace(s[0],a),this.regexp.lastIndex=0;return t},t}(),T=function(e){function t(n,o,r){var i=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];m.classCallCheck(this,t);var s=m.possibleConstructorReturn(this,e.call(this));return s.backend=n,s.store=o,s.services=r,s.options=i,s.logger=S.create("backendConnector"),s.state={},s.queue=[],s.backend&&s.backend.init&&s.backend.init(r,i.backend,i),s}return m.inherits(t,e),t.prototype.queueLoad=function(e,t,n){var o=this,r=[],i=[],s=[],a=[];return e.forEach(function(e){var n=!0;t.forEach(function(t){var s=e+"|"+t;o.store.hasResourceBundle(e,t)?o.state[s]=2:o.state[s]<0||(1===o.state[s]?i.indexOf(s)<0&&i.push(s):(o.state[s]=1,n=!1,i.indexOf(s)<0&&i.push(s),r.indexOf(s)<0&&r.push(s),a.indexOf(t)<0&&a.push(t)))}),n||s.push(e)}),(r.length||i.length)&&this.queue.push({pending:i,loaded:{},errors:[],callback:n}),{toLoad:r,pending:i,toLoadLanguages:s,toLoadNamespaces:a}},t.prototype.loaded=function(e,t,n){var o=this,i=e.split("|"),s=m.slicedToArray(i,2),a=s[0],l=s[1];t&&this.emit("failedLoading",a,l,t),n&&this.store.addResourceBundle(a,l,n),this.state[e]=t?-1:2,this.queue.forEach(function(n){r(n.loaded,[a],l),v(n.pending,e),t&&n.errors.push(t),0!==n.pending.length||n.done||(n.errors.length?n.callback(n.errors):n.callback(),o.emit("loaded",n.loaded),n.done=!0)}),this.queue=this.queue.filter(function(e){return!e.done})},t.prototype.read=function(e,t,n,o,r,i){var s=this;return o||(o=0),r||(r=250),e.length?void this.backend[n](e,t,function(a,l){return a&&l&&5>o?void setTimeout(function(){s.read.call(s,e,t,n,++o,2*r,i)},r):void i(a,l)}):i(null,{})},t.prototype.load=function(e,t,n){var o=this;if(!this.backend)return this.logger.warn("No backend was added via i18next.use. Will not load resources."),n&&n();var r=m["extends"]({},this.backend.options,this.options.backend);"string"==typeof e&&(e=this.services.languageUtils.toResolveHierarchy(e)),"string"==typeof t&&(t=[t]);var s=this.queueLoad(e,t,n);return s.toLoad.length?void(r.allowMultiLoading&&this.backend.readMulti?this.read(s.toLoadLanguages,s.toLoadNamespaces,"readMulti",null,null,function(e,t){e&&o.logger.warn("loading namespaces "+s.toLoadNamespaces.join(", ")+" for languages "+s.toLoadLanguages.join(", ")+" via multiloading failed",e),!e&&t&&o.logger.log("loaded namespaces "+s.toLoadNamespaces.join(", ")+" for languages "+s.toLoadLanguages.join(", ")+" via multiloading",t),s.toLoad.forEach(function(n){var r=n.split("|"),s=m.slicedToArray(r,2),a=s[0],l=s[1],u=i(t,[a,l]);if(u)o.loaded(n,e,u);else{var c="loading namespace "+l+" for language "+a+" via multiloading failed";o.loaded(n,c),o.logger.error(c)}})}):!function(){var e=function(e){var t=this,n=e.split("|"),o=m.slicedToArray(n,2),r=o[0],i=o[1];this.read(r,i,"read",null,null,function(n,o){n&&t.logger.warn("loading namespace "+i+" for language "+r+" failed",n),!n&&o&&t.logger.log("loaded namespace "+i+" for language "+r,o),t.loaded(e,n,o)})};s.toLoad.forEach(function(t){e.call(o,t)})}()):void(s.pending.length||n())},t.prototype.saveMissing=function(e,t,n,o){this.backend&&this.backend.create&&this.backend.create(e,t,n,o),this.store.addResource(e[0],t,n,o)},t}(w),A=function(e){function t(n,o,r){var i=arguments.length<=3||void 0===arguments[3]?{}:arguments[3];m.classCallCheck(this,t);var s=m.possibleConstructorReturn(this,e.call(this));return s.cache=n,s.store=o,s.services=r,s.options=i,s.logger=S.create("cacheConnector"),s.cache&&s.cache.init&&s.cache.init(r,i.cache,i),s}return m.inherits(t,e),t.prototype.load=function(e,t,n){var o=this;if(!this.cache)return n&&n();var r=m["extends"]({},this.cache.options,this.options.cache);"string"==typeof e&&(e=this.services.languageUtils.toResolveHierarchy(e)),"string"==typeof t&&(t=[t]),r.enabled?this.cache.load(e,function(t,r){if(t&&o.logger.error("loading languages "+e.join(", ")+" from cache failed",t),r)for(var i in r)for(var s in r[i])if("i18nStamp"!==s){var a=r[i][s];a&&o.store.addResourceBundle(i,s,a)}n&&n()}):n&&n()},t.prototype.save=function(){this.cache&&this.options.cache&&this.options.cache.enabled&&this.cache.save(this.store.data)},t}(w),M=function(e){function t(){var n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments[1];m.classCallCheck(this,t);var r=m.possibleConstructorReturn(this,e.call(this));return r.options=b(n),r.services={},r.logger=S,r.modules={},o&&!r.isInitialized&&r.init(n,o),r}return m.inherits(t,e),t.prototype.init=function(e,t){function n(e){return e?"function"==typeof e?new e:e:void 0}var o=this;if("function"==typeof e&&(t=e,e={}),e||(e={}),"v1"===e.compatibilityAPI?this.options=m["extends"]({},y(),b(c(e)),{}):"v1"===e.compatibilityJSON?this.options=m["extends"]({},y(),b(p(e)),{}):this.options=m["extends"]({},y(),this.options,b(e)),t||(t=function(){}),!this.options.isClone){this.modules.logger?S.init(n(this.modules.logger),this.options):S.init(null,this.options);var r=new j(this.options);this.store=new L(this.options.resources,this.options);var i=this.services;i.logger=S,i.resourceStore=this.store,i.resourceStore.on("added removed",function(e,t){i.cacheConnector.save()}),i.languageUtils=r,i.pluralResolver=new E(r,{prepend:this.options.pluralSeparator,compatibilityJSON:this.options.compatibilityJSON}),i.interpolator=new _(this.options),i.backendConnector=new T(n(this.modules.backend),i.resourceStore,i,this.options),i.backendConnector.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))}),i.backendConnector.on("loaded",function(e){i.cacheConnector.save()}),i.cacheConnector=new A(n(this.modules.cache),i.resourceStore,i,this.options),i.cacheConnector.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))}),this.modules.languageDetector&&(i.languageDetector=n(this.modules.languageDetector),i.languageDetector.init(i,this.options.detection,this.options)),this.translator=new O(this.services,this.options),this.translator.on("*",function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;t>r;r++)n[r-1]=arguments[r];o.emit.apply(o,[e].concat(n))})}var s=["getResource","addResource","addResources","addResourceBundle","removeResourceBundle","hasResourceBundle","getResourceBundle"];s.forEach(function(e){o[e]=function(){return this.store[e].apply(this.store,arguments)}}),"v1"===this.options.compatibilityAPI&&h(this);var a=function(){o.changeLanguage(o.options.lng,function(e,n){o.emit("initialized",o.options),o.logger.log("initialized",o.options),t(e,n)})};return this.options.resources?a():setTimeout(a,10),this},t.prototype.loadResources=function(e){var t=this;if(e||(e=function(){}),this.options.resources)e(null);else{var n=function(){if(t.language&&"cimode"===t.language.toLowerCase())return{v:e()};var n=[],o=function(e){var o=t.services.languageUtils.toResolveHierarchy(e);o.forEach(function(e){n.indexOf(e)<0&&n.push(e)})};o(t.language),t.options.preload&&t.options.preload.forEach(function(e){o(e)}),t.services.cacheConnector.load(n,t.options.ns,function(){t.services.backendConnector.load(n,t.options.ns,e)})}();if("object"===("undefined"==typeof n?"undefined":m["typeof"](n)))return n.v}},t.prototype.use=function(e){return"backend"===e.type&&(this.modules.backend=e),"cache"===e.type&&(this.modules.cache=e),("logger"===e.type||e.log&&e.warn&&e.warn)&&(this.modules.logger=e),"languageDetector"===e.type&&(this.modules.languageDetector=e),"postProcessor"===e.type&&N.addPostProcessor(e),this},t.prototype.changeLanguage=function(e,t){var n=this,o=function(o){e&&(n.emit("languageChanged",e),n.logger.log("languageChanged",e)),t&&t(o,function(){for(var e=arguments.length,t=Array(e),o=0;e>o;o++)t[o]=arguments[o];return n.t.apply(n,t)})};!e&&this.services.languageDetector&&(e=this.services.languageDetector.detect()),e&&(this.language=e,this.languages=this.services.languageUtils.toResolveHierarchy(e),this.translator.changeLanguage(e),this.services.languageDetector&&this.services.languageDetector.cacheUserLanguage(e)),this.loadResources(function(e){o(e)})},t.prototype.getFixedT=function(e,t){var n=this,o=function r(e,t){return t=t||{},t.lng=t.lng||r.lng,t.ns=t.ns||r.ns,n.t(e,t)};return o.lng=e,o.ns=t,o},t.prototype.t=function(){return this.translator&&this.translator.translate.apply(this.translator,arguments)},t.prototype.exists=function(){return this.translator&&this.translator.exists.apply(this.translator,arguments)},t.prototype.setDefaultNamespace=function(e){this.options.defaultNS=e},t.prototype.loadNamespaces=function(e,t){var n=this;return this.options.ns?("string"==typeof e&&(e=[e]),e.forEach(function(e){n.options.ns.indexOf(e)<0&&n.options.ns.push(e)}),void this.loadResources(t)):t&&t()},t.prototype.loadLanguages=function(e,t){"string"==typeof e&&(e=[e]);var n=this.options.preload||[],o=e.filter(function(e){return n.indexOf(e)<0});return o.length?(this.options.preload=n.concat(o),
void this.loadResources(t)):t()},t.prototype.dir=function(e){e||(e=this.language);var t=["ar","shu","sqr","ssh","xaa","yhd","yud","aao","abh","abv","acm","acq","acw","acx","acy","adf","ads","aeb","aec","afb","ajp","apc","apd","arb","arq","ars","ary","arz","auz","avl","ayh","ayl","ayn","ayp","bbz","pga","he","iw","ps","pbt","pbu","pst","prp","prd","ur","ydd","yds","yih","ji","yi","hbo","men","xmn","fa","jpr","peo","pes","prs","dv","sam"];return t.indexOf(this.services.languageUtils.getLanguagePartFromCode(e))?"ltr":"rtl"},t.prototype.createInstance=function(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],n=arguments[1];return new t(e,n)},t.prototype.cloneInstance=function(){var e=this,n=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],o=arguments[1],r=new t(m["extends"]({},n,this.options,{isClone:!0}),o),i=["store","translator","services","language"];return i.forEach(function(t){r[t]=e[t]}),r},t}(w),H=new M;return H});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define("i18nextXHRBackend",t):e.i18nextXHRBackend=t()}(this,function(){"use strict";function e(e){return a.call(r.call(arguments,1),function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])}),e}function t(e,t,n,i,a){if(i&&"object"===("undefined"==typeof i?"undefined":o["typeof"](i))){var r="",s=encodeURIComponent;for(var l in i)r+="&"+s(l)+"="+s(i[l]);i=r.slice(1)+(a?"":"&_t="+new Date)}try{var c=new(XMLHttpRequest||ActiveXObject)("MSXML2.XMLHTTP.3.0");c.open(i?"POST":"GET",e,1),t.crossDomain||c.setRequestHeader("X-Requested-With","XMLHttpRequest"),c.setRequestHeader("Content-type","application/x-www-form-urlencoded"),c.onreadystatechange=function(){c.readyState>3&&n&&n(c.responseText,c)},c.send(i)}catch(s){window.console&&console.log(s)}}function n(){return{loadPath:"/locales/{{lng}}/{{ns}}.json",addPath:"locales/add/{{lng}}/{{ns}}",allowMultiLoading:!1,parse:JSON.parse,crossDomain:!1,ajax:t}}var o={};o["typeof"]="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},o.classCallCheck=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},o.createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}();var i=[],a=i.forEach,r=i.slice,s=function(){function t(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];o.classCallCheck(this,t),this.init(e,n),this.type="backend"}return o.createClass(t,[{key:"init",value:function(t){var o=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];this.services=t,this.options=e(o,this.options||{},n())}},{key:"readMulti",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e.join("+"),ns:t.join("+")});this.loadUrl(o,n)}},{key:"read",value:function(e,t,n){var o=this.services.interpolator.interpolate(this.options.loadPath,{lng:e,ns:t});this.loadUrl(o,n)}},{key:"loadUrl",value:function(e,t){var n=this;this.options.ajax(e,this.options,function(o,i){var a=i.status.toString();if(0===a.indexOf("5"))return t("failed loading "+e,!0);if(0===a.indexOf("4"))return t("failed loading "+e,!1);var r=void 0,s=void 0;try{r=n.options.parse(o)}catch(l){s="failed parsing "+e+" to json"}return s?t(s,!1):void t(null,r)})}},{key:"create",value:function(e,t,n,o){var i=this;"string"==typeof e&&(e=[e]);var a={};a[n]=o||"",e.forEach(function(e){var n=i.services.interpolator.interpolate(i.options.addPath,{lng:e,ns:t});i.options.ajax(n,i.options,function(e,t){},a)})}}]),t}();return s.type="backend",s});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define("jqueryI18next",e):t.jqueryI18next=e()}(this,function(){"use strict";function t(t,a){function r(n,a,r){function i(t,n){return s.parseDefaultValueFromContent?e["extends"]({},t,{defaultValue:n}):t}if(0!==a.length){var o="text";if(0===a.indexOf("[")){var f=a.split("]");a=f[1],o=f[0].substr(1,f[0].length-1)}if(a.indexOf(";")===a.length-1&&(a=a.substr(0,a.length-2)),"html"===o)n.html(t.t(a,i(r,n.html())));else if("text"===o)n.text(t.t(a,i(r,n.text())));else if("prepend"===o)n.prepend(t.t(a,i(r,n.html())));else if("append"===o)n.append(t.t(a,i(r,n.html())));else if(0===o.indexOf("data-")){var l=o.substr("data-".length),d=t.t(a,i(r,n.data(l)));n.data(l,d),n.attr(o,d)}else n.attr(o,t.t(a,i(r,n.attr(o))))}}function i(t,n){var i=t.attr(s.selectorAttr);if(i||"undefined"==typeof i||i===!1||(i=t.text()||t.val()),i){var o=t,f=t.data(s.targetAttr);if(f&&(o=t.find(f)||t),n||s.useOptionsAttr!==!0||(n=t.data(s.optionsAttr)),n=n||{},i.indexOf(";")>=0){var l=i.split(";");a.each(l,function(t,e){""!==e&&r(o,e,n)})}else r(o,i,n);if(s.useOptionsAttr===!0){var d={};d=e["extends"]({clone:d},n),delete d.lng,t.data(s.optionsAttr,d)}}}function o(t){return this.each(function(){i(a(this),t);var e=a(this).find("["+s.selectorAttr+"]");e.each(function(){i(a(this),t)})})}var s=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];s=e["extends"]({},n,s),a[s.tName]=t.t.bind(t),a[s.i18nName]=t,a.fn[s.handleName]=o}var e={};e["extends"]=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};var n={tName:"t",i18nName:"i18n",handleName:"localize",selectorAttr:"data-i18n",targetAttr:"i18n-target",optionsAttr:"i18n-options",useOptionsAttr:!1,parseDefaultValueFromContent:!0},a={init:t};return a});

/***/ })
/******/ ]);
//# sourceMappingURL=inpage.js.map