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
__webpack_require__(24);
__webpack_require__(25);
__webpack_require__(26);
__webpack_require__(27);
__webpack_require__(28);
__webpack_require__(29);
__webpack_require__(30);
__webpack_require__(31);
__webpack_require__(32);
__webpack_require__(33);
__webpack_require__(34);
__webpack_require__(35);
__webpack_require__(36);
__webpack_require__(37);
__webpack_require__(38);
__webpack_require__(39);
__webpack_require__(40);
__webpack_require__(41);
__webpack_require__(42);
module.exports = __webpack_require__(43);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this enhances the $2sxc client controller with stuff only needed when logged in 
(function () {
    if (!window.$2sxc || window.$2sxc.consts)
        return false;
    $2sxc.c = $2sxc.consts = {
        // classes
        cls: {
            scMenu: "sc-menu",
            scCb: "sc-content-block",
            scElm: "sc-element"
        },
        // attribs
        attr: {
            toolbar: "toolbar",
            toolbarData: "data-toolbar",
            settings: "settings",
            settingsData: "data-settings"
        },
        publishAllowed: "DraftOptional"
    };
    // selectors
    var sel = $2sxc.c.sel = {};
    Object.keys($2sxc.c.cls).forEach(function (key, index) {
        sel[key] = "." + $2sxc.c.cls[key];
    });
    /*
    ToDo: functional programming
    $2sxc.c.sel = Object.entries($2sxc.c.cls).reduce((res, current) => {
        res[entry[0]] = entry[1];
        return t;
    }, {});
    */
})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// this enhances the $2sxc client controller with stuff only needed when logged in
(function () {
    if (!window.$2sxc || window.$2sxc.system)
        return;
    $2sxc.system = {
        finishUpgrade: finishUpgrade
    };
    // upgrade command - started when an error contains a link to start this
    function finishUpgrade(domElement) {
        var mc = $2sxc(domElement);
        $.ajax({
            type: "get",
            url: mc.resolveServiceUrl("view/module/finishinstallation"),
            beforeSend: $.ServicesFramework(mc.id).setModuleHeaders
        }).success(function () {
            alert("Upgrade ok, restarting the CMS and reloading...");
            location.reload();
        });
        alert("starting upgrade. This could take a few minutes. You'll see an 'ok' when it's done. Please wait...");
    }
})();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function () {
    $2sxc._commands = {};
})();


/***/ }),
/* 4 */
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
                    $2sxc.contentItems["delete"](sxc, settings.entityId, settings.entityGuid, settings.entityTitle);
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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

(function () {
    $2sxc._commands.instanceEngine = function (sxc, editContext) {
        var engine = {
            commands: $2sxc._commands.initializeInstanceCommands(editContext),
            // assemble an object which will store the configuration and execute it
            create: function (specialSettings) {
                var settings = $2sxc._lib.extend({}, sxc.manage._instanceConfig, specialSettings); // merge button with general toolbar-settings
                var ngDialogUrl = sxc.manage._editContext.Environment.SxcRootUrl +
                    "desktopmodules/tosic_sexycontent/dist/dnn/ui.html?sxcver=" +
                    sxc.manage._editContext.Environment.SxcVersion;
                var isDebug = $2sxc.urlParams.get("debug") ? "&debug=true" : "";
                var cmd = {
                    settings: settings,
                    items: settings.items || [],
                    params: $2sxc._lib.extend({
                        dialog: settings.dialog || settings.action // the variable used to name the dialog changed in the history of 2sxc from action to dialog
                    }, settings.params),
                    addSimpleItem: function () {
                        var itm = {}, ct = cmd.settings.contentType || cmd.settings.attributeSetName; // two ways to name the content-type-name this, v 7.2+ and older
                        if (cmd.settings.entityId)
                            itm.EntityId = cmd.settings.entityId;
                        if (ct)
                            itm.ContentTypeName = ct;
                        // only add if there was stuff to add
                        if (itm.EntityId || itm.ContentTypeName)
                            cmd.items.push(itm);
                    },
                    // this adds an item of the content-group, based on the group GUID and the sequence number
                    addContentGroupItem: function (guid, index, part, isAdd, isEntity, cbid, sectionLanguageKey) {
                        cmd.items.push({
                            Group: {
                                Guid: guid,
                                Index: index,
                                Part: part,
                                Add: isAdd
                            },
                            Title: $2sxc.translate(sectionLanguageKey)
                        });
                    },
                    // this will tell the command to edit a item from the sorted list in the group, optionally together with the presentation item
                    addContentGroupItemSetsToEditList: function (withPresentation) {
                        var isContentAndNotHeader = (cmd.settings.sortOrder !== -1), index = isContentAndNotHeader ? cmd.settings.sortOrder : 0, prefix = isContentAndNotHeader ? "" : "List", cTerm = prefix + "Content", pTerm = prefix + "Presentation", isAdd = cmd.settings.action === "new", groupId = cmd.settings.contentGroupId;
                        cmd.addContentGroupItem(groupId, index, cTerm.toLowerCase(), isAdd, cmd.settings.cbIsEntity, cmd.settings.cbId, "EditFormTitle." + cTerm);
                        if (withPresentation)
                            cmd.addContentGroupItem(groupId, index, pTerm.toLowerCase(), isAdd, cmd.settings.cbIsEntity, cmd.settings.cbId, "EditFormTitle." + pTerm);
                    },
                    // build the link, combining specific params with global ones and put all in the url
                    generateLink: function () {
                        // if there is no items-array, create an empty one (it's required later on)
                        if (!cmd.settings.items)
                            cmd.settings.items = [];
                        //#region steps for all actions: prefill, serialize, open-dialog
                        // when doing new, there may be a prefill in the link to initialize the new item
                        if (cmd.settings.prefill) {
                            for (var i = 0; i < cmd.items.length; i++) {
                                cmd.items[i].Prefill = cmd.settings.prefill;
                            }
                        }
                        cmd.params.items = JSON.stringify(cmd.items); // Serialize/json-ify the complex items-list
                        // clone the params and adjust parts based on partOfPage settings...
                        var sharedParams = $2sxc._lib.extend({}, sxc.manage._dialogParameters);
                        if (!cmd.settings.partOfPage) {
                            delete sharedParams.versioningRequirements;
                            delete sharedParams.publishing;
                            sharedParams.partOfPage = false;
                        }
                        return ngDialogUrl +
                            "#" + $.param(sharedParams) +
                            "&" + $.param(cmd.params) +
                            isDebug;
                        //#endregion
                    }
                };
                return cmd;
            },
            // create a dialog link
            _linkToNgDialog: function (specialSettings) {
                var cmd = sxc.manage._commands.create(specialSettings);
                if (cmd.settings.useModuleList)
                    cmd.addContentGroupItemSetsToEditList(true);
                else
                    cmd.addSimpleItem();
                // if the command has own configuration stuff, do that now
                if (cmd.settings.configureCommand)
                    cmd.settings.configureCommand(cmd);
                return cmd.generateLink();
            },
            // open a new dialog of the angular-ui
            _openNgDialog: function (settings, event, sxc /*, closeCallback*/) {
                // the callback will handle events after closing the dialog
                // and reload the in-page view w/ajax or page reload
                var callback = function () {
                    $2sxc._contentBlock.reloadAndReInitialize(sxc);
                    // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
                };
                var link = engine._linkToNgDialog(settings); // the link contains everything to open a full dialog (lots of params added)
                if (settings.inlineWindow)
                    return $2sxc._quickDialog.showOrToggle(sxc, link, callback, settings.fullScreen /* settings.dialog === "item-history"*/, settings.dialog);
                if (settings.newWindow || (event && event.shiftKey))
                    return window.open(link);
                return $2sxc.totalPopup.open(link, callback);
            },
            // ToDo: remove dead code
            executeAction: function (nameOrSettings, settings, event) {
                // cycle parameters, in case it was called with 2 params only
                if (!event && settings && typeof settings.altKey !== "undefined") {
                    event = settings; // move it to the correct variable
                    settings = {}; // clear the settings variable, as none was provided
                }
                // pre-save event because afterwards we have a promise, so the event-object changes; funky syntax is because of browser differences
                var origEvent = event || window.event;
                // check if name is name (string) or object (settings)
                settings = (typeof nameOrSettings === "string") ?
                    $2sxc._lib.extend(settings || {}, {
                        "action": nameOrSettings
                    }) // place the name as an action-name into a command-object
                    :
                        nameOrSettings;
                var conf = engine.commands[settings.action];
                settings = $2sxc._lib.extend({}, conf, settings); // merge conf & settings, but settings has higher priority
                if (!settings.dialog)
                    settings.dialog = settings.action; // old code uses "action" as the parameter, now use verb ? dialog
                if (!settings.code)
                    settings.code = engine._openNgDialog; // decide what action to perform
                if (conf.uiActionOnly)
                    return settings.code(settings, origEvent, sxc);
                // if more than just a UI-action, then it needs to be sure the content-group is created first
                return $2sxc._contentBlock.prepareToAddContent(sxc, settings.useModuleList)
                    .then(function () {
                    return settings.code(settings, origEvent, sxc);
                });
            }
        };
        return engine;
    };
})();


/***/ }),
/* 6 */
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


/***/ }),
/* 8 */
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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// contains commands to create/move/delete a contentBlock in a page
$2sxc._contentBlock.manipulator = function (sxc) {
    return {
        create: create,
        move: move,
        "delete": remove
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
            guid: newGuid
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
            indexTo: indexTo
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
            index: index
        };
        return sxc.webApi.get({ url: 'view/module/RemoveItemInList', params: params })
            .then(function () {
            console.log('done deleting!');
            window.location.reload();
        });
    }
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*
 * this is the content block manager in the browser
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
    /**
     * ajax update/replace the content of the content-block
     * optionally also initialze the toolbar (if not just preview)
     * @param {Object<>} sxc
     * @param {string} newContent
     * @param {boolean} justPreview
     * @returns {}
     */
    cbm.replaceCb = function (sxc, newContent, justPreview) {
        try {
            var newStuff = $(newContent);
            // Must disable toolbar before we attach to DOM
            if (justPreview)
                $2sxc._toolbarManager.disable(newStuff);
            $($2sxc._manage.getTag(sxc)).replaceWith(newStuff);
            // reset the cache, so the sxc-object is refreshed
            sxc.recreate(true);
        }
        catch (e) {
            console.log("Error while rendering template:", e);
        }
    };
    /**
     * Show a message where the content of a module should be - usually as placeholder till something else happens
     * @param {object} sxc
     * @param {string} newContent
     * @returns {} - nothing
     */
    cbm.showMessage = function (sxc, newContent) {
        $($2sxc._manage.getTag(sxc)).html(newContent);
    };
    cbm.ajaxLoad = function (sxc, alternateTemplateId, justPreview) {
        // ajax-call, then replace
        return cbm.getPreviewWithTemplate(sxc, alternateTemplateId)
            .then(function (result) {
            return cbm.replaceCb(sxc, result, justPreview);
        })
            .then($quickE.reset); // reset quick-edit, because the config could have changed
    };
    // this one assumes a replace / change has already happened, but now must be finalized...
    cbm.reloadAndReInitialize = function (sxc, forceAjax, preview) {
        var manage = sxc.manage;
        // if ajax is not supported, we must reload the whole page
        if (!forceAjax && !manage._reloadWithAjax)
            return window.location.reload();
        return cbm.ajaxLoad(sxc, cbm.cUseExistingTemplate, !!preview)
            .then(function () {
            // tell Evoq that page has changed if it has changed (Ajax call)
            if (window.dnn_tabVersioningEnabled)
                try {
                    window.dnn.ContentEditorManager.triggerChangeOnPageContentEvent();
                }
                catch (e) { }
            // maybe check if already publish
            // compare to HTML module
            // if (publishing is required (FROM CONTENT BLOCK) and publish button not visible) show publish button
            // 2017-09-02 2dm - believe this was meant to re-init the dialog manager, but it doesn't actually work
            // must check for side-effects, which would need the manager to re-build the configuration
            $2sxc._quickDialog.hide();
        });
    };
})();


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/*
 * this is part of the content block manager
 */
(function () {
    var cbm = $2sxc._contentBlock;
    Object.assign(cbm, {
        prepareToAddContent: prepareToAddContent,
        updateTemplateFromDia: updateTemplateFromDia
    });
    return;
    /**
     * prepare the instance so content can be added
     * this ensure the content-group has been created, which is required to add content
     * @param {} sxc
     * @returns {}
     */
    function prepareToAddContent(sxc, useModuleList) {
        var isCreated = sxc.manage._editContext.ContentGroup.IsCreated;
        if (isCreated || !useModuleList)
            return $.when(null);
        // return persistTemplate(sxc, null);
        // var manage = sxc.manage;
        // var contentGroup = manage._editContext.ContentGroup;
        // var showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
        // var groupExistsAndTemplateUnchanged = !!contentGroup.HasContent; // && !showingAjaxPreview;
        var templateId = sxc.manage._editContext.ContentGroup.TemplateId;
        // template has not changed
        // if (groupExistsAndTemplateUnchanged) return $.when(null);
        // persist the template
        return updateTemplate(sxc, templateId, true);
    }
    /**
     * Update the template and adjust UI accordingly.
     * @param {*} sxc
     * @param {*} templateId
     * @param {*} forceCreate
     */
    function updateTemplateFromDia(sxc, templateId, forceCreate) {
        var contentGroup = sxc.manage._editContext.ContentGroup;
        var showingAjaxPreview = $2sxc._toolbarManager.isDisabled(sxc);
        // todo: should move things like remembering undo etc. back into the contentBlock state manager
        // or just reset it, so it picks up the right values again ?
        return updateTemplate(sxc, templateId, forceCreate)
            .then(function () {
            $2sxc._quickDialog.hide();
            // if it didn't have content, then it only has now...
            if (!contentGroup.HasContent)
                contentGroup.HasContent = forceCreate;
            // only reload on ajax, not on app as that was already re-loaded on the preview
            // necessary to show the original template again
            if (showingAjaxPreview)
                cbm.reloadAndReInitialize(sxc);
        });
    }
    /**
     * Update the template.
     */
    function updateTemplate(sxc, templateId, forceCreate) {
        return cbm.saveTemplate(sxc, templateId, forceCreate)
            .then(function (data, textStatus, xhr) {
            // error handling
            if (xhr.status !== 200)
                return alert('error - result not ok, was not able to create ContentGroup');
            if (!data)
                return;
            // fixes a special case where the guid is given with quotes (dependes on version of angularjs) issue #532
            newGuid = data.replace(/[\",\']/g, '');
            if (console)
                console.log('created content group {' + newGuid + '}');
            sxc.manage._updateContentGroupGuid(newGuid);
        });
    }
})();


/***/ }),
/* 12 */
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


/***/ }),
/* 13 */
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
        develop: function () { run("template-develop"); }
    };
};


/***/ }),
/* 14 */
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


/***/ }),
/* 15 */
/***/ (function(module, exports) {

// this enhances the $2sxc client controller with stuff only needed when logged in
(function () {
    if (window.$2sxc) {
        //#region contentItem Commands
        $2sxc.contentItems = {
            // delete command - try to really delete a content-item
            "delete": function (sxc, itemId, itemGuid, itemTitle) {
                // first show main warning / get ok
                var ok = confirm($2sxc.translate("Delete.Confirm")
                    .replace("{id}", itemId)
                    .replace("{title}", itemTitle));
                if (!ok)
                    return;
                sxc.webApi["delete"]("app-content/any/" + itemGuid, null, null, true)
                    .success(function () {
                    location.reload();
                }).error(function (error) {
                    var msgJs = $2sxc.translate("Delete.ErrCheckConsole");
                    console.log(error);
                    // check if it's a permission config problem
                    if (error.status === 401)
                        alert($2sxc.translate("Delete.ErrPermission") + msgJs);
                    if (error.status === 400)
                        alert($2sxc.translate("Delete.ErrInUse") + msgJs);
                });
            }
        };
        //#endregion
    }
})();


/***/ }),
/* 16 */
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


/***/ }),
/* 17 */
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


/***/ }),
/* 18 */
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


/***/ }),
/* 19 */
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


/***/ }),
/* 20 */
/***/ (function(module, exports) {

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];
            // 5. Let k be 0.
            var k = 0;
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }
            // 7. Return undefined.
            return undefined;
        }
    });
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {

if (typeof Object.assign != 'function') {
    Object.assign = function (target, varArgs) {
        'use strict';
        if (target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            if (nextSource !== null) {
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// this is a dialog manager which is in charge of all
// quick-dialogs. 
// it always has a reference to the latest dialog created by any module instance
(function () {
    var resizeInterval = 200;
    var scrollTopOffset = 80;
    var resizeWatcher = null;
    var diagShowClass = "dia-select";
    var isFullscreen = false;
    /**
     * dialog manager - the currently active dialog object
     */
    var diagManager = $2sxc._quickDialog = {
        current: null,
        /**
         * toggle visibility
         * @param {boolean} [show] true/false optional
         */
        toggle: function (show) {
            var cont = $(diagManager.getContainer());
            if (show === undefined)
                show = !cont.hasClass(diagShowClass);
            // show/hide visually
            cont.toggleClass(diagShowClass, show);
            diagManager.current = show ? diagManager.getIFrame() : null;
        },
        hide: function () {
            if (diagManager.current)
                diagManager.toggle(false);
        },
        /**
         * cancel the current dialog
         */
        cancel: function () {
            if (diagManager.current)
                diagManager.current.cancel(); // cancel & hide
        },
        /**
         * Remember dialog state across page-reload
         * @param {Object<any>} sxc - the sxc which is persisted for
         */
        persistDialog: function (sxc) {
            sessionStorage.setItem("dia-cbid", sxc.cbid);
        },
        /**
         * get the current container
         * @returns {element} html element of the div
         */
        getContainer: function () {
            var container = $(".inpage-frame-wrapper");
            return container.length > 0 ? container : buildContainerAndIFrame();
        },
        /**
         * find the iframe which hosts the dialog
         * @param {html} [container] - html-container as jQuery object
         * @returns {html} iframe object
         */
        getIFrame: function (container) {
            if (!container)
                container = diagManager.getContainer();
            return container.find("iframe")[0];
        },
        /**
         * check if the dialog is showing for the current sxc-instance
         * @param {Object<any>} sxc - sxc object
         * @param {string} dialogName - name of dialog
         * @returns {boolean} true if it's currently showing for this sxc-instance
         */
        isShowing: function (sxc, dialogName) {
            return diagManager.current // there is a current dialog
                &&
                    diagManager.current.sxcCacheKey === sxc.cacheKey // the iframe is showing for the current sxc
                &&
                    diagManager.current.dialogName === dialogName; // the view is the same as previously
        },
        /**
         * show / reset the current iframe to use new url and callback
         * @param {any} sxc - sxc object
         * @param {string} url - url to show
         * @param {function()} closeCallback - callback event
         * @param {boolean} fullScreen - if it should open full screen
         * @param {string} [dialogName] - optional name of dialog, to check if it's already open
         * @returns {any} jquery object of the iframe
         */
        showOrToggle: function (sxc, url, closeCallback, fullScreen, dialogName) {
            setSize(fullScreen);
            var iFrame = diagManager.getIFrame();
            // in case it's a toggle
            if (dialogName && diagManager.isShowing(sxc, dialogName))
                return diagManager.hide();
            iFrame.rewire(sxc, closeCallback, dialogName);
            iFrame.setAttribute("src", rewriteUrl(url));
            // if the window had already been loaded, re-init
            if (iFrame.contentWindow && iFrame.contentWindow.reboot)
                iFrame.contentWindow.reboot();
            // make sure it's visible'
            iFrame.toggle(true);
            return iFrame;
        }
    };
    /**
     * build the container in the dom w/iframe for re-use
     * @return {jquery} jquery dom-object
     */
    function buildContainerAndIFrame() {
        var container = $('<div class="inpage-frame-wrapper"><div class="inpage-frame"></div></div>');
        var newIFrame = document.createElement("iframe");
        newIFrame = extendIFrameWithSxcState(newIFrame);
        container.find(".inpage-frame").html(newIFrame);
        $("body").append(container);
        watchForResize();
        return container;
    }
    function setSize(fullScreen) {
        var container = diagManager.getContainer();
        // set container height
        container.css("min-height", fullScreen ? "100%" : "225px");
        isFullscreen = fullScreen;
    }
    function extendIFrameWithSxcState(iFrame) {
        var hiddenSxc = null;
        var cbApi = $2sxc._contentBlock;
        var tagModule = null;
        /**
         * get the sxc-object of this iframe
         * @returns {Object<any>} refreshed sxc-object
         */
        function reSxc() {
            if (!hiddenSxc)
                throw "can't find sxc-instance of IFrame, probably it wasn't initialized yet";
            return hiddenSxc.recreate();
        }
        var newFrm = Object.assign(iFrame, {
            closeCallback: null,
            rewire: function (sxc, callback, dialogName) {
                hiddenSxc = sxc;
                tagModule = $($($2sxc._manage.getTag(sxc)).parent().eq(0));
                newFrm.sxcCacheKey = sxc.cacheKey;
                newFrm.closeCallback = callback;
                if (dialogName)
                    newFrm.dialogName = dialogName;
            },
            getManageInfo: function () {
                return reSxc().manage._dialogParameters;
            },
            getAdditionalDashboardConfig: function () {
                return reSxc().manage._quickDialogConfig;
            },
            persistDia: function () {
                diagManager.persistDialog(reSxc());
            },
            scrollToTarget: function () {
                $("body").animate({
                    scrollTop: tagModule.offset().top - scrollTopOffset
                });
            },
            toggle: function (show) {
                diagManager.toggle(show);
            },
            cancel: function () {
                newFrm.toggle(false);
                //todo: only re-init if something was changed?
                // return cbApi.reloadAndReInitialize(reSxc());
                // cancel the dialog
                localStorage.setItem('cancelled-dialog', true);
                return newFrm.closeCallback();
            },
            run: function (verb) {
                reSxc().manage.run(verb);
            },
            showMessage: function (message) {
                cbApi.showMessage(reSxc(), '<p class="no-live-preview-available">' + message + "</p>");
            },
            reloadAndReInit: function () {
                return cbApi.reloadAndReInitialize(reSxc(), true, true);
            },
            saveTemplate: function (templateId) {
                return cbApi.updateTemplateFromDia(reSxc(), templateId, false);
            },
            previewTemplate: function (templateId) {
                return cbApi.ajaxLoad(reSxc(), templateId, true);
            }
        });
        return newFrm;
    }
    /**
     * rewrite the url to fit the quick-dialog situation
     * optionally with a live-compiled version from ng-serve
     * @param {string} url - original url pointing to the "wrong" dialog
     * @returns {string} new url
     */
    function rewriteUrl(url) {
        // change default url-schema from the primary angular-app to the quick-dialog
        url = url.replace("dist/dnn/ui.html?", "dist/ng/ui.html?");
        // special debug-code when running on local ng-serve
        // this is only activated if the developer manually sets a value in the localStorage
        try {
            var devMode = localStorage.getItem("devMode");
            if (devMode && ~~devMode)
                url = url.replace("/desktopmodules/tosic_sexycontent/dist/ng/ui.html", "http://localhost:4200");
        }
        catch (e) {
            // ignore
        }
        return url;
    }
    /**
     * create watcher which monitors the iframe size and adjusts the container as needed
     * @param {boolean} [keepWatching] optional true/false to start/stop the watcher
     * @returns {null} nothing
     */
    function watchForResize(keepWatching) {
        if (keepWatching === false && resizeWatcher) {
            clearInterval(resizeWatcher);
            resizeWatcher = null;
            return null;
        }
        var cont = diagManager.getContainer();
        if (!resizeWatcher)
            resizeWatcher = setInterval(function () {
                try {
                    var frm = diagManager.getIFrame(cont);
                    if (!frm)
                        return;
                    var height = frm.contentDocument.body.offsetHeight;
                    if (frm.previousHeight === height)
                        return;
                    frm.style.minHeight = cont.css("min-height");
                    frm.style.height = height + "px";
                    frm.previousHeight = height;
                    if (isFullscreen) {
                        frm.style.height = "100%";
                        frm.style.position = "absolute";
                    }
                }
                catch (e) {
                    // ignore
                }
            }, resizeInterval);
        return resizeWatcher;
    }
})();


/***/ }),
/* 23 */
/***/ (function(module, exports) {

$(function () {
    "use strict";
    // the quick-edit object
    var $quickE = window.$quickE = {};
    // selectors used all over the in-page-editing, centralized to ensure consistency
    $quickE.selectors = {
        cb: {
            id: "cb",
            "class": "sc-content-block",
            selector: ".sc-content-block",
            listSelector: ".sc-content-block-list",
            context: "data-list-context",
            singleItem: "single-item"
        },
        mod: {
            id: "mod",
            "class": "DnnModule",
            selector: ".DnnModule",
            listSelector: ".DNNEmptyPane, .dnnDropEmptyPanes, :has(>.DnnModule)",
            context: null
        },
        eitherCbOrMod: ".DnnModule, .sc-content-block",
        selected: "sc-cb-is-selected"
    };
    $quickE.btn = function (action, icon, i18N, invisible, unavailable, classes) {
        return "<a class='sc-content-block-menu-btn sc-cb-action icon-sxc-" + icon + " "
            + (invisible ? " sc-invisible " : "")
            + (unavailable ? " sc-unavailable " : "")
            + classes + "' data-action='" + action + "' data-i18n='[title]QuickInsertMenu." + i18N + "'></a>";
    };
    // the quick-insert object
    $.extend($quickE, {
        body: $("body"),
        win: $(window),
        main: $("<div class='sc-content-block-menu sc-content-block-quick-insert sc-i18n'></div>"),
        template: "<a class='sc-content-block-menu-addcontent sc-invisible' data-type='Default' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockContent'>x</a>"
            + "<a class='sc-content-block-menu-addapp sc-invisible' data-type='' data-i18n='[titleTemplate]QuickInsertMenu.AddBlockApp'>x</a>"
            + $quickE.btn("select", "ok", "Select", true)
            + $quickE.btn("paste", "paste", "Paste", true, true),
        selected: $("<div class='sc-content-block-menu sc-content-block-selected-menu sc-i18n'></div>")
            .append($quickE.btn("delete", "trash-empty", "Delete"), $quickE.btn("sendToPane", "export", "Move", null, null, "sc-cb-mod-only"), "<div id='paneList'></div>"),
        contentBlocks: null,
        cachedPanes: null,
        modules: null,
        nearestCb: null,
        nearestMod: null,
        modManage: null // will be populated later in the module section
    });
    // add stuff which dependes on other values to create
    $.extend($quickE, {
        cbActions: $($quickE.template),
        modActions: $($quickE.template.replace(/QuickInsertMenu.AddBlock/g, "QuickInsertMenu.AddModule"))
            .attr("data-context", "module")
            .addClass("sc-content-block-menu-module")
    });
    // build the toolbar (hidden, but ready to show)
    $quickE.prepareToolbarInDom = function () {
        $quickE.body.append($quickE.main)
            .append($quickE.selected);
        $quickE.main.append($quickE.cbActions)
            .append($quickE.modActions);
    };
});


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// add a clipboard to the quick edit
$(function () {
    // perform copy and paste commands - needs the clipboard
    $quickE.copyPasteInPage = function (cbAction, list, index, type) {
        var newClip = $quickE.clipboard.createSpecs(type, list, index);
        // action!
        switch (cbAction) {
            case "select":
                $quickE.clipboard.mark(newClip);
                break;
            case "paste":
                var from = $quickE.clipboard.data.index, to = newClip.index;
                // check that we only move block-to-block or module to module
                if ($quickE.clipboard.data.type !== newClip.type)
                    return alert("can't move module-to-block; move only works from module-to-module or block-to-block");
                if (isNaN(from) || isNaN(to) || from === to)
                    return $quickE.clipboard.clear(); // don't do anything
                // cb-numbering is a bit different, because the selector is at the bottom
                // only there we should also skip on +1;
                if (newClip.type === $quickE.selectors.cb.id && from + 1 === to)
                    return $quickE.clipboard.clear(); // don't do anything
                if (type === $quickE.selectors.cb.id) {
                    $2sxc(list).manage._getCbManipulator().move(newClip.parent, newClip.field, from, to);
                }
                else {
                    $quickE.cmds.mod.move($quickE.clipboard.data, newClip, from, to);
                }
                $quickE.clipboard.clear();
                break;
            default:
        }
        return null;
    };
    // clipboard object - remembers what module (or content-block) was previously copied / needs to be pasted
    $quickE.clipboard = {
        data: {},
        mark: function (newData) {
            if (newData) {
                // if it was already selected with the same thing, then release it
                if ($quickE.clipboard.data && $quickE.clipboard.data.item === newData.item)
                    return $quickE.clipboard.clear();
                $quickE.clipboard.data = newData;
            }
            $("." + $quickE.selectors.selected).removeClass($quickE.selectors.selected); // clear previous markings
            var cb = $($quickE.clipboard.data.item);
            cb.addClass($quickE.selectors.selected);
            if (cb.prev().is("iframe"))
                cb.prev().addClass($quickE.selectors.selected);
            $quickE.setSecondaryActionsState(true);
            $quickE.selected.toggle(cb, $quickE.clipboard.data.type);
        },
        clear: function () {
            $("." + $quickE.selectors.selected).removeClass($quickE.selectors.selected);
            $quickE.clipboard.data = null;
            $quickE.setSecondaryActionsState(false);
            $quickE.selected.toggle(false);
        },
        createSpecs: function (type, list, index) {
            var listItems = list.find($quickE.selectors[type].selector);
            if (index >= listItems.length)
                index = listItems.length - 1; // sometimes the index is 1 larger than the length, then select last
            var currentItem = listItems[index];
            var editContext = JSON.parse(list.attr($quickE.selectors.cb.context) || null) || { parent: "dnn", field: list.id };
            return { parent: editContext.parent, field: editContext.field, list: list, item: currentItem, index: index, type: type };
        }
    };
    $quickE.setSecondaryActionsState = function (state) {
        var btns = $("a.sc-content-block-menu-btn");
        btns = btns.filter(".icon-sxc-paste");
        btns.toggleClass("sc-unavailable", !state);
    };
    $quickE.selected.toggle = function (target) {
        if (!target)
            return $quickE.selected.hide();
        var coords = $quickE.getCoordinates(target);
        coords.yh = coords.y + 20;
        $quickE.positionAndAlign($quickE.selected, coords);
        $quickE.selected.target = target;
    };
    // bind clipboard actions 
    $("a", $quickE.selected).click(function () {
        var action = $(this).data("action");
        var clip = $quickE.clipboard.data;
        switch (action) {
            case "delete":
                return $quickE.cmds[clip.type]["delete"](clip);
            case "sendToPane":
                return $quickE.cmds.mod.sendToPane(clip);
        }
    });
});


/***/ }),
/* 25 */
/***/ (function(module, exports) {

// extend the quick edit with the core commands
$(function () {
    $quickE.cmds = {
        cb: {
            "delete": function (clip) {
                return $2sxc(clip.list).manage._getCbManipulator()["delete"](clip.parent, clip.field, clip.index);
            },
            "create": function (parent, field, index, appOrContent, list, newGuid) {
                return $2sxc(list).manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
            }
        },
        mod: {
            "delete": function (clip) {
                if (!confirm("are you sure?"))
                    return;
                var modId = $quickE.modManage.getModuleId(clip.item.className);
                $quickE.modManage["delete"](modId);
            },
            // todo: unsure if this is a good place for this bit of code...
            move: function (oldClip, newClip, from, to) {
                var modId = $quickE.modManage.getModuleId(oldClip.item.className);
                var pane = $quickE.modManage.getPaneName(newClip.list);
                $quickE.modManage.move(modId, pane, to);
            },
            sendToPane: function () {
                var pane = $quickE.main.actionsForModule.closest($quickE.selectors.mod.listSelector);
                // show the pane-options
                var pl = $quickE.selected.find("#paneList");
                if (!pl.is(":empty"))
                    pl.empty();
                pl.append($quickE.modManage.getMoveButtons($quickE.modManage.getPaneName(pane)));
            }
        }
    };
});


/***/ }),
/* 26 */
/***/ (function(module, exports) {

$(function () {
    var configAttr = "quick-edit-config";
    // the initial configuration
    var conf = $quickE.config = {
        enable: true,
        innerBlocks: {
            enable: null // default: auto-detect
        },
        modules: {
            enable: null // default: auto-detect
        }
    };
    $quickE._readPageConfig = function () {
        var configs = $("[" + configAttr + "]"), finalConfig = {}, confJ, confO;
        // any inner blocks found? will currently affect if modules can be inserted...
        var hasInnerCBs = ($($quickE.selectors.cb.listSelector).length > 0);
        if (configs.length > 0) {
            // go through reverse list, as the last is the most important...
            for (var c = configs.length; c >= 0; c--) {
                confJ = configs[0].getAttribute(configAttr);
                try {
                    confO = JSON.parse(confJ);
                    $.extend(finalConfig, confO);
                }
                catch (e) {
                    console.warn('had trouble with json', e);
                }
            }
            $.extend(conf, finalConfig);
        }
        // re-check "auto" or "null"
        // if it has inner-content, then it's probably a details page, where quickly adding modules would be a problem, so for now, disable modules in this case
        if (conf.modules.enable === null || conf.modules.enable === 'auto')
            conf.modules.enable = !hasInnerCBs;
        // for now, ContentBlocks are only enabled if they exist on the page
        if (conf.innerBlocks.enable === null || conf.innerBlocks.enable === 'auto')
            conf.innerBlocks.enable = hasInnerCBs;
    };
});


/***/ }),
/* 27 */
/***/ (function(module, exports) {

// content-block specific stuff like actions
$(function () {
    function onCbButtonClick() {
        var list = $quickE.main.actionsForCb.closest($quickE.selectors.cb.listSelector), listItems = list.find($quickE.selectors.cb.selector), actionConfig = JSON.parse(list.attr($quickE.selectors.cb.context)), index = 0, newGuid = actionConfig.guid || null;
        if ($quickE.main.actionsForCb.hasClass($quickE.selectors.cb["class"]))
            index = listItems.index($quickE.main.actionsForCb[0]) + 1;
        // check cut/paste
        var cbAction = $(this).data("action");
        if (cbAction)
            // this is a cut/paste action
            return $quickE.copyPasteInPage(cbAction, list, index, $quickE.selectors.cb.id);
        else {
            var appOrContent = $(this).data("type");
            return $quickE.cmds.cb.create(actionConfig.parent, actionConfig.field, index, appOrContent, list, newGuid);
        }
    }
    $quickE.cbActions.click(onCbButtonClick);
});


/***/ }),
/* 28 */
/***/ (function(module, exports) {

// module specific stuff
$(function () {
    "use strict";
    $quickE.modManage = {
        "delete": deleteMod,
        create: createModWithTypeName,
        move: moveMod,
        getPaneName: getPaneName,
        getModuleId: getModuleId,
        getMoveButtons: generatePaneMoveButtons
    };
    function getPaneName(pane) {
        return $(pane).attr("id").replace("dnn_", "");
    }
    // find the correct module id from a list of classes - used on the module-wrapper
    function getModuleId(classes) {
        var result = classes.match(/DnnModule-([0-9]+)(?:\W|$)/);
        return (result && result.length === 2) ? result[1] : null;
    }
    // show an error when an xhr error occurs
    function xhrError(xhr, optionalMessage) {
        alert(optionalMessage || "Error while talking to server.");
        console.log(xhr);
    }
    // service calls we'll need
    function createModWithTypeName(paneName, index, type) {
        return sendDnnAjax(null, "controlbar/GetPortalDesktopModules", {
            data: "category=All&loadingStartIndex=0&loadingPageSize=100&searchTerm=",
            success: function (desktopModules) {
                var moduleToFind = type === "Default" ? " Content" : " App";
                var module = null;
                desktopModules.forEach(function (e, i) {
                    if (e.ModuleName === moduleToFind)
                        module = e;
                });
                return (!module)
                    ? alert(moduleToFind + " module not found.")
                    : createMod(paneName, index, module.ModuleID);
            }
        });
    }
    // move a dnn module
    function moveMod(modId, pane, order) {
        var service = $.dnnSF(modId);
        var tabId = service.getTabId();
        var dataVar = {
            TabId: tabId,
            ModuleId: modId,
            Pane: pane,
            ModuleOrder: (2 * order + 4) // strange formula, copied from DNN https://github.com/dnnsoftware/Dnn.Platform/blob/fd225b8de07042837f7473cd49fba13de42a3cc0/Website/admin/Menus/ModuleActions/ModuleActions.js#L70
        };
        sendDnnAjax(modId, "ModuleService/MoveModule", {
            type: "POST",
            data: dataVar,
            success: function () {
                window.location.reload();
            }
        });
        //fire window resize to reposition action menus
        $(window).resize();
    }
    // delete a module
    function deleteMod(modId) {
        var service = $.dnnSF(modId);
        var tabId = service.getTabId();
        return sendDnnAjax(modId, "2sxc/dnn/module/delete", {
            url: $.dnnSF().getServiceRoot("2sxc") + "dnn/module/delete",
            type: "GET",
            data: {
                tabId: tabId,
                modId: modId
            },
            success: function (d) {
                window.location.reload();
            }
        });
    }
    // call an api on dnn
    function sendDnnAjax(modId, serviceName, options) {
        var service = $.dnnSF(modId);
        return $.ajax($.extend({
            type: "GET",
            url: service.getServiceRoot("internalservices") + serviceName,
            beforeSend: service.setModuleHeaders,
            error: xhrError
        }, options));
    }
    // create / insert a new module
    function createMod(paneName, position, modId) {
        var postData = {
            Module: modId,
            Page: "",
            Pane: paneName,
            Position: -1,
            Sort: position,
            Visibility: 0,
            AddExistingModule: false,
            CopyModule: false
        };
        return sendDnnAjax(null, "controlbar/AddModule", {
            type: "POST",
            data: postData,
            success: function (d) {
                window.location.reload();
            }
        });
    }
    function generatePaneMoveButtons(current) {
        var pns = $quickE.cachedPanes;
        // generate list of panes as links
        var targets = $("<div>");
        for (var p = 0; p < pns.length; p++) {
            var pName = $quickE.modManage.getPaneName(pns[p]), selected = (current === pName) ? " selected " : "";
            if (!selected)
                targets.append("<a data='" + pName + "'>" + pName + "</a>");
        }
        // attach click event...
        targets.find("a").click(function (d) {
            var link = $(this), clip = $quickE.clipboard.data, modId = $quickE.modManage.getModuleId(clip.item.className), newPane = link.attr("data");
            $quickE.modManage.move(modId, newPane, 0);
        });
        return targets;
    }
});


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// module specific stuff
$(function () {
    function onModuleButtonClick() {
        var type = $(this).data("type"), dnnMod = $quickE.main.actionsForModule, pane = dnnMod.closest($quickE.selectors.mod.listSelector), index = 0;
        if (dnnMod.hasClass("DnnModule"))
            index = pane.find(".DnnModule").index(dnnMod[0]) + 1;
        var cbAction = $(this).data("action");
        if (cbAction)
            return $quickE.copyPasteInPage(cbAction, pane, index, $quickE.selectors.mod.id);
        return $quickE.modManage.create($quickE.modManage.getPaneName(pane), index, type);
    }
    // bind module actions click
    $quickE.modActions.click(onModuleButtonClick);
});


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// everything related to positioning the quick-edit in-page editing
$(function () {
    // Prepare offset calculation based on body positioning
    $quickE.getBodyPosition = function () {
        var bodyPos = $quickE.body.css("position");
        return bodyPos === "relative" || bodyPos === "absolute"
            ? { x: $quickE.body.offset().left, y: $quickE.body.offset().top }
            : { x: 0, y: 0 };
    };
    // Refresh content block and modules elements
    $quickE.refreshDomObjects = function () {
        $quickE.bodyOffset = $quickE.getBodyPosition(); // must update this, as sometimes after finishing page load the position changes, like when dnn adds the toolbar
        //// Cache the panes (because panes can't change dynamically)
        //if (!$quickE.cachedPanes)
        //    $quickE.cachedPanes = $($quickE.selectors.mod.listSelector);
        if ($quickE.config.innerBlocks.enable) {
            // get all content-block lists which are empty, or which allow multiple child-items
            var lists = $($quickE.selectors.cb.listSelector)
                .filter(":not(." + $quickE.selectors.cb.singleItem + "), :empty");
            $quickE.contentBlocks = lists // $($quickE.selectors.cb.listSelector)
                .find($quickE.selectors.cb.selector)
                .add(lists); // $quickE.selectors.cb.listSelector);
        }
        if ($quickE.config.modules.enable)
            $quickE.modules = $quickE.cachedPanes
                .find($quickE.selectors.mod.selector)
                .add($quickE.cachedPanes);
    };
    // position, align and show a menu linked to another item
    $quickE.positionAndAlign = function (element, coords) {
        return element.css({
            left: coords.x - $quickE.bodyOffset.x,
            top: coords.yh - $quickE.bodyOffset.y,
            width: coords.element.width()
        }).show();
    };
    // Refresh positioning / visibility of the quick-insert bar
    $quickE.refresh = function (e) {
        var highlightClass = "sc-cb-highlight-for-insert";
        if (!$quickE.refreshDomObjects.lastCall || (new Date() - $quickE.refreshDomObjects.lastCall > 1000)) {
            // console.log('refreshed contentblock and modules');
            $quickE.refreshDomObjects.lastCall = new Date();
            $quickE.refreshDomObjects();
        }
        if ($quickE.config.innerBlocks.enable && $quickE.contentBlocks) {
            $quickE.nearestCb = $quickE.findNearest($quickE.contentBlocks, { x: e.clientX, y: e.clientY }, $quickE.selectors.cb.selector);
        }
        if ($quickE.config.modules.enable && $quickE.modules) {
            $quickE.nearestMod = $quickE.findNearest($quickE.modules, { x: e.clientX, y: e.clientY }, $quickE.selectors.mod.selector);
        }
        $quickE.modActions.toggleClass("sc-invisible", $quickE.nearestMod === null);
        $quickE.cbActions.toggleClass("sc-invisible", $quickE.nearestCb === null);
        var oldParent = $quickE.main.parentContainer;
        if ($quickE.nearestCb !== null || $quickE.nearestMod !== null) {
            var alignTo = $quickE.nearestCb || $quickE.nearestMod;
            // find parent pane to highlight
            var parentPane = $(alignTo.element).closest($quickE.selectors.mod.listSelector);
            var parentCbList = $(alignTo.element).closest($quickE.selectors.cb.listSelector);
            var parentContainer = (parentCbList.length ? parentCbList : parentPane)[0];
            // put part of the pane-name into the button-labels
            if (parentPane.length > 0) {
                var paneName = parentPane.attr("id") || "";
                if (paneName.length > 4)
                    paneName = paneName.substr(4);
                $quickE.modActions.filter("[titleTemplate]").each(function () {
                    var t = $(this);
                    t.attr("title", t.attr("titleTemplate").replace("{0}", paneName));
                });
            }
            $quickE.positionAndAlign($quickE.main, alignTo, true);
            // Keep current block as current on menu
            $quickE.main.actionsForCb = $quickE.nearestCb ? $quickE.nearestCb.element : null;
            $quickE.main.actionsForModule = $quickE.nearestMod ? $quickE.nearestMod.element : null;
            $quickE.main.parentContainer = parentContainer;
            $(parentContainer).addClass(highlightClass);
        }
        else {
            $quickE.main.parentContainer = null;
            $quickE.main.hide();
        }
        // if previously a parent-pane was highlighted, un-highlight it now
        if (oldParent && oldParent !== $quickE.main.parentContainer)
            $(oldParent).removeClass(highlightClass);
    };
    // Return the nearest element to the mouse cursor from elements (jQuery elements)
    $quickE.findNearest = function (elements, position) {
        var maxDistance = 30; // Defines the maximal distance of the cursor when the menu is displayed
        var nearestItem = null;
        var nearestDistance = maxDistance;
        var posX = position.x + $quickE.win.scrollLeft();
        var posY = position.y + $quickE.win.scrollTop();
        // Find nearest element
        elements.each(function () {
            var e = $quickE.getCoordinates($(this));
            // First check x coordinates - must be within container
            if (posX < e.x || posX > e.x + e.w)
                return;
            // Check if y coordinates are within boundaries
            var distance = Math.abs(posY - e.yh);
            if (distance < maxDistance && distance < nearestDistance) {
                nearestItem = e;
                nearestDistance = distance;
            }
        });
        return nearestItem;
    };
    $quickE.getCoordinates = function (element) {
        return {
            element: element,
            x: element.offset().left,
            w: element.width(),
            y: element.offset().top,
            // For content-block ITEMS, the menu must be visible at the end
            // For content-block-LISTS, the menu must be at top
            yh: element.offset().top + (element.is($quickE.selectors.eitherCbOrMod) ? element.height() : 0)
        };
    };
});


/***/ }),
/* 31 */
/***/ (function(module, exports) {

$(function () {
    $quickE.enable = function () {
        // build all toolbar html-elements
        $quickE.prepareToolbarInDom();
        // Cache the panes (because panes can't change dynamically)
        $quickE.initPanes();
    };
    // start watching for mouse-move
    $quickE.watchMouse = function () {
        var refreshTimeout = null;
        $("body").on("mousemove", function (e) {
            if (refreshTimeout === null)
                refreshTimeout = window.setTimeout(function () {
                    requestAnimationFrame(function () {
                        $quickE.refresh(e);
                        refreshTimeout = null;
                    });
                }, 20);
        });
    };
    $quickE.start = function () {
        try {
            $quickE._readPageConfig();
            if ($quickE.config.enable) {
                // initialize first body-offset
                $quickE.bodyOffset = $quickE.getBodyPosition();
                $quickE.enable();
                $quickE.toggleParts();
                $quickE.watchMouse();
            }
        }
        catch (e) {
            console.error("couldn't start quick-edit", e);
        }
    };
    // cache the panes which can contain modules
    $quickE.initPanes = function () {
        $quickE.cachedPanes = $($quickE.selectors.mod.listSelector);
        $quickE.cachedPanes.addClass("sc-cb-pane-glow");
    };
    // enable/disable module/content-blocks as configured
    $quickE.toggleParts = function () {
        //// content blocks actions
        //$quickE.cbActions.toggle($quickE.config.innerBlocks.enable);
        //// module actions
        //$quickE.modActions.hide($quickE.config.modules.enable);
    };
    // reset the quick-edit
    // for example after ajax-loading a content-block, which may cause changed configurations
    $quickE.reset = function () {
        $quickE._readPageConfig();
        $quickE.toggleParts();
    };
    // run on-load
    $($quickE.start);
});


/***/ }),
/* 32 */
/***/ (function(module, exports) {

(function () {
    // prevent propagation of the click (if menu was clicked)
    $($2sxc.c.sel.scMenu /*".sc-menu"*/).click(function (e) {
        e.stopPropagation();
    });
})();


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// enable shake detection on all toolbars
$(function () {
    // this will add a css-class to auto-show all toolbars (or remove it again)
    function toggleAllToolbars() {
        $(document.body).toggleClass('sc-tb-show-all');
    }
    // start shake-event monitoring, which will then generate a window-event
    (new Shake({ callback: toggleAllToolbars })).start();
});


/***/ }),
/* 34 */
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


/***/ }),
/* 35 */
/***/ (function(module, exports) {

(function () {
    // quick debug - set to false if not needed for production
    var dbg = false;
    // default / fallback settings for toolbars when nothings is specified
    var settingsForEmptyToolbar = {
        hover: 'left',
        autoAddMore: 'left'
    };
    Object.assign($2sxc._toolbarManager, {
        buildToolbars: buildToolbars,
        disable: disable,
        isDisabled: isDisabled
    });
    return;
    // generate an empty / fallback toolbar tag
    function generateFallbackToolbar() {
        var settingsString = JSON.stringify(settingsForEmptyToolbar);
        return $("<ul class='sc-menu' toolbar='' settings='" + settingsString + "'/>");
    }
    // find current toolbars inside this wrapper-tag
    function getToolbarTags(parentTag) {
        var allInner = $(".sc-menu[toolbar],.sc-menu[data-toolbar]", parentTag);
        // return only those, which don't belong to a sub-item
        var res = allInner.filter(function (i, e) {
            return $(e).closest(".sc-content-block")[0] === parentTag[0];
        });
        if (dbg)
            console.log("found toolbars for parent", parentTag, res);
        return res;
    }
    // create a process-toolbar command to generate toolbars inside a tag
    function buildToolbars(parentTag, optionalId) {
        parentTag = $(parentTag || ".DnnModule-" + optionalId);
        // if something says the toolbars are disabled, then skip
        if (parentTag.attr($2sxc._toolbarManager.cDisableAttrName))
            return;
        // todo: change mechanism to not render toolbar, this uses a secret class name which the toolbar shouldn't know
        // don't add, if it is has un-initialized content
        // 2017-09-08 2dm disabled this, I believe the bootstrapping should never call this any more, if sc-uninitialized. if ok, then delete this in a few days
        //var disableAutoAdd = $(".sc-uninitialized", parentTag).length !== 0;
        var toolbars = getToolbarTags(parentTag);
        // no toolbars found, must help a bit because otherwise editing is hard
        if (toolbars.length === 0) {
            if (dbg)
                console.log("didn't find toolbar, so will auto-create", parentTag);
            var outsideCb = !parentTag.hasClass($2sxc.c.cls.scCb); // "sc-content-block");
            var contentTag = outsideCb ? parentTag.find("div.sc-content-block") : parentTag;
            contentTag.addClass($2sxc.c.cls.scElm); // "sc-element");
            contentTag.prepend(generateFallbackToolbar());
            toolbars = getToolbarTags(parentTag);
        }
        toolbars.each(function initToolbar() {
            var tag = $(this), data = null, toolbarConfig, toolbarSettings, at = $2sxc.c.attr;
            try {
                data = tag.attr(at.toolbar) || tag.attr(at.toolbarData) || "{}";
                toolbarConfig = JSON.parse(data);
                data = tag.attr(at.settings) || tag.attr(at.settingsData) || "{}";
                toolbarSettings = JSON.parse(data);
                if (toolbarConfig === {} && toolbarSettings === {})
                    toolbarSettings = settingsForEmptyToolbar;
            }
            catch (err) {
                console
                    .error("error in settings JSON - probably invalid - make sure you also quote your properties like \"name\": ...", data, err);
                return;
            }
            try {
                tag.replaceWith($2sxc(tag).manage.getToolbar(toolbarConfig, toolbarSettings));
            }
            catch (err2) {
                // note: errors happen a lot on custom toolbars, amke sure the others are still rendered
                console.error("error creating toolbar - will skip this one", err2);
            }
        });
    }
    function disable(tag) {
        tag = $(tag);
        tag.attr($2sxc._toolbarManager.cDisableAttrName, true);
    }
    function isDisabled(sxc) {
        var tag = $($2sxc._manage.getTag(sxc));
        return !!tag.attr($2sxc._toolbarManager.cDisableAttrName);
    }
})();


/***/ }),
/* 36 */
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


/***/ }),
/* 37 */
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


/***/ }),
/* 38 */
/***/ (function(module, exports) {

// the toolbar manager is an internal helper
// taking care of toolbars, buttons etc.
(function () {
    // ToDo: refactor to avoid side-effects
    var tools = $2sxc._toolbarManager.buttonHelpers = {
        defaultSettings: {
            autoAddMore: null,
            hover: "right",
            show: "hover"
        },
        // take any common input format and convert it to a full toolbar-structure definition
        // can handle the following input formats (the param unstructuredConfig):
        // complete tree (detected by "groups): { groups: [ {}, {}], name: ..., defaults: {...} } 
        // group of buttons (detected by "buttons): { buttons: "..." | [], name: ..., ... }
        // list of buttons (detected by IsArray with action): [ { action: "..." | []}, { action: ""|[]} ]
        // button (detected by "command"): { command: ""|[], icon: "..", ... }
        // just a command (detected by "action"): { entityId: 17, action: "edit" }
        // array of commands: [{entityId: 17, action: "edit"}, {contentType: "blog", action: "new"}]
        buildFullDefinition: function (unstructuredConfig, allActions, instanceConfig, moreSettings) {
            var fullConfig = tools.ensureDefinitionTree(unstructuredConfig, moreSettings);
            // ToDo: don't use console.log in production
            if (unstructuredConfig.debug)
                console.log("toolbar: detailed debug on; start build full Def");
            tools.expandButtonGroups(fullConfig, allActions);
            tools.removeDisableButtons(fullConfig, instanceConfig);
            if (fullConfig.debug)
                console.log("after remove: ", fullConfig);
            tools.customize(fullConfig);
            return fullConfig;
        },
        //#region build initial toolbar object
        // this will take an input which could already be a tree, but it could also be a 
        // button-definition, or just a string, and make sure that afterwards it's a tree with groups
        // the groups could still be in compact form, or already expanded, dependending on the input
        // output is object with:
        // - groups containing buttons[], but buttons could still be very flat
        // - defaults, already officially formatted
        // - params, officially formatted 
        ensureDefinitionTree: function (original, moreSettings) {
            // original is null/undefined, just return empty set
            if (!original)
                throw ("preparing toolbar, with nothing to work on: " + original);
            // ensure that if it's just actions or buttons, they are then processed as arrays with 1 entry
            if (!Array.isArray(original) && (original.action || original.buttons))
                original = [original];
            // ensure that arrays of actions or buttons are re-mapped to the right structure node
            if (Array.isArray(original) && original.length) {
                // an array of items having buttons, so it must be button-groups
                if (original[0].buttons)
                    original.groups = original; // move "down"
                else if (original[0].command || original[0].action)
                    original = { groups: [{ buttons: original }] };
                else
                    console.warn("toolbar tried to build toolbar but couldn't detect type of this:", original);
            }
            // build an object with this structure
            return {
                name: original.name || "toolbar",
                debug: original.debug || false,
                groups: original.groups || [],
                defaults: original.defaults || {},
                params: original.params || {},
                settings: $2sxc._lib.extend({}, tools.defaultSettings, original.settings, moreSettings)
            };
        },
        //#endregion inital toolbar object
        // this will traverse a groups-tree and expand each group
        // so if groups were just strings like "edit,new" or compact buttons, they will be expanded afterwards
        expandButtonGroups: function (fullSet, actions) {
            // by now we should have a structure, let's check/fix the buttons
            for (var g = 0; g < fullSet.groups.length; g++) {
                // expand a verb-list like "edit,new" into objects like [{ action: "edit" }, {action: "new"}]
                tools.expandButtonList(fullSet.groups[g], fullSet.settings);
                // fix all the buttons
                var btns = fullSet.groups[g].buttons;
                if (Array.isArray(btns))
                    for (var b = 0; b < btns.length; b++) {
                        var btn = btns[b];
                        if (!(actions[btn.command.action]))
                            console.warn("warning: toolbar-button with unknown action-name:", btn.command.action);
                        $2sxc._lib.extend(btn.command, fullSet.params); // enhance the button with settings for this instance
                        // tools.addCommandParams(fullSet, btn);
                        tools.addDefaultBtnSettings(btn, fullSet.groups[g], fullSet, actions); // ensure all buttons have either own settings, or the fallbacks
                    }
            }
        },
        // take a list of buttons (objects OR strings)
        // and convert to proper array of buttons with actions
        // on the in is a object with buttons, which are either:
        // - a string like "edit" or multi-value "layout,more"
        // - an array of such strings incl. optional complex objects which are
        expandButtonList: function (root, settings) {
            // var root = grp; // the root object which has all params of the command
            var btns = [], sharedProperties = null;
            // convert compact buttons (with multi-verb action objects) into own button-objects
            // important because an older syntax allowed {action: "new,edit", entityId: 17}
            if (Array.isArray(root.buttons)) {
                for (var b = 0; b < root.buttons.length; b++) {
                    var btn = root.buttons[b];
                    if (typeof btn.action === "string" && btn.action.indexOf(",") > -1) {
                        var acts = btn.action.split(",");
                        for (var a = 0; a < acts.length; a++) {
                            btns.push($.extend(true, {}, btn, { action: acts[a] }));
                        }
                    }
                    else
                        btns.push(btn);
                }
            }
            else if (typeof root.buttons === "string") {
                btns = root.buttons.split(",");
                sharedProperties = $.extend({}, root); // inherit all fields used in the button
                delete sharedProperties.buttons; // this one's not needed
                delete sharedProperties.name; // this one's not needed
                delete sharedProperties.action; //
            }
            else {
                btns = root.buttons;
            }
            // optionally add a more-button in each group
            if (settings.autoAddMore) {
                if (settings.autoAddMore === "right")
                    btns.push("more");
                else {
                    btns.unshift("more");
                }
            }
            // add each button - check if it's already an object or just the string
            for (var v = 0; v < btns.length; v++) {
                btns[v] = tools.expandButtonConfig(btns[v], sharedProperties);
                // todo: refactor this out, not needed any more as they are all together now
                // btns[v].group = root;// grp;    // attach group reference, needed for fallback etc.
            }
            root.buttons = btns; // ensure the internal def is also an array now
        },
        // takes an object like "actionname" or { action: "actionname", ... } and changes it to a { command: { action: "actionname" }, ... }
        expandButtonConfig: function (original, sharedProps) {
            // prevent multiple inits
            if (original._expanded || original.command)
                return original;
            // if just a name, turn into a command
            if (typeof original === "string")
                original = { action: original };
            // if it's a command w/action, wrap into command + trim
            if (typeof original.action === "string") {
                original.action = original.action.trim();
                original = { command: original };
            }
            // some clean-up
            delete original.action; // remove the action property
            original._expanded = true;
            return original;
        },
        // remove buttons which are not valid based on add condition
        removeDisableButtons: function (full, config) {
            var btnGroups = full.groups;
            for (var g = 0; g < btnGroups.length; g++) {
                var btns = btnGroups[g].buttons;
                removeUnfitButtons(btns, config);
                disableButtons(btns, config);
                // remove the group, if no buttons left, or only "more"
                if (btns.length === 0 || (btns.length === 1 && btns[0].command.action === "more"))
                    btnGroups.splice(g--, 1); // remove, and decrement counter
            }
            function removeUnfitButtons(btns, config) {
                for (var i = 0; i < btns.length; i++) {
                    //var add = btns[i].showCondition;
                    //if (add !== undefined)
                    //    if (typeof (add) === "function" ? !add(btns[i].command, config) : !add)
                    if (!tools.evalPropOrFunction(btns[i].showCondition, btns[i].command, config, true))
                        btns.splice(i--, 1);
                }
            }
            function disableButtons(btns, config) {
                for (var i = 0; i < btns.length; i++)
                    btns[i].disabled = tools.evalPropOrFunction(btns[i].disabled, btns[i].command, config, false);
            }
        },
        btnProperties: [
            "classes",
            "icon",
            "title",
            "dynamicClasses",
            "showCondition",
            "disabled"
        ],
        prvProperties: [
            "defaults",
            "params",
            "name"
        ],
        // enhance button-object with default icons, etc.
        addDefaultBtnSettings: function (btn, group, groups, actions) {
            for (var d = 0; d < tools.btnProperties.length; d++)
                fallbackBtnSetting(btn, actions, tools.btnProperties[d]);
            // configure missing button properties with various fallback options
            function fallbackBtnSetting(btn, actions, propName) {
                btn[propName] = btn[propName] // by if already defined, use the already defined propery
                    || (group.defaults && group.defaults[propName]) // if the group has defaults, try use use that property
                    || (groups && groups.defaults && groups.defaults[propName]) // if the group has defaults, try use use that property
                    || (actions[btn.command.action] && actions[btn.command.action][propName]); // if there is an action, try to use that property name
            }
        },
        customize: function (toolbar) {
            //if (!toolbar.settings) return;
            //var set = toolbar.settings;
            //if (set.autoAddMore) {
            //    console.log("auto-more");
            //    var grps = toolbar.groups;
            //    for (var g = 0; g < grps.length; g++) {
            //        var btns = grps[g];
            //        for (var i = 0; i < btns.length; i++) {
            //        }
            //    }
            //}
        },
        evalPropOrFunction: function (propOrFunction, settings, config, fallback) {
            if (propOrFunction === undefined || propOrFunction === null)
                return fallback;
            return typeof (propOrFunction) === "function" ? propOrFunction(settings, config) : propOrFunction;
        }
    };
})();


/***/ }),
/* 39 */
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


/***/ }),
/* 40 */
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
            autoAddMore: "right"
        }
    };
})();


/***/ }),
/* 41 */
/***/ (function(module, exports) {

// initialize the translation system; ensure toolbars etc. are translated
(function () {
    var initialized = false;
    $2sxc._translateInit = function (manage) {
        if (initialized)
            return;
        window.i18next
            .use(window.i18nextXHRBackend)
            .init({
            lng: manage._editContext.Language.Current.substr(0, 2),
            fallbackLng: "en",
            whitelist: ["en", "de", "fr", "it", "uk", "nl"],
            preload: ["en"],
            backend: {
                loadPath: manage._editContext.Environment.SxcRootUrl + "desktopmodules/tosic_sexycontent/dist/i18n/inpage-{{lng}}.js"
            }
        }, function (err, t) {
            // for options see
            // https://github.com/i18next/jquery-i18next#initialize-the-plugin
            jqueryI18next.init(i18next, $);
            // start localizing, details:
            // https://github.com/i18next/jquery-i18next#usage-of-selector-function
            $("ul.sc-menu").localize(); // inline toolbars
            $(".sc-i18n").localize(); // quick-insert menus
        });
        initialized = true;
    };
})();


/***/ }),
/* 42 */
/***/ (function(module, exports) {

// provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
(function () {
    $2sxc.translate = function (key) {
        // return key;
        return ($.t && $.t(key)) || key;
    };
})();


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// module & toolbar bootstrapping (initialize all toolbars after loading page)
// this will run onReady...
$(function () {
    var initializedModules = [];
    var openedTemplatePickerOnce = false;
    var cancelledDialog = localStorage.getItem('cancelled-dialog');
    if (cancelledDialog)
        localStorage.removeItem('cancelled-dialog');
    initAllModules(true);
    // watch for ajax reloads on edit or view-changes, to re-init the toolbars etc.
    document.body.addEventListener("DOMSubtreeModified", function (event) {
        initAllModules(false);
    }, false);
    return; // avoid side-effects
    function initAllModules(isFirstRun) {
        $("div[data-edit-context]").each(function () {
            initModule(this, isFirstRun);
        });
        tryShowTemplatePicker();
    }
    /**
     * Show the template picker if
     * - template picker has not yet been opened
     * - dialog has not been cancelled
     * - only one uninitialized module on page
     * @returns
     */
    function tryShowTemplatePicker() {
        var uninitializedModules = $('.sc-uninitialized');
        if (cancelledDialog || openedTemplatePickerOnce)
            return false;
        // already showing a dialog
        if ($2sxc._quickDialog.current !== null)
            return false;
        // not exactly one uninitialized module
        if (uninitializedModules.length !== 1)
            return false;
        // show the template picker of this module
        var module = uninitializedModules.parent('div[data-edit-context]')[0];
        $2sxc(module).manage.run('layout');
        openedTemplatePickerOnce = true;
    }
    function initModule(module, isFirstRun) {
        // check if module is already in the list of initialized modules
        if (initializedModules.find(function (m) {
            return m === module;
        }))
            return false;
        // add to modules-list
        initializedModules.push(module);
        var sxc = $2sxc(module);
        // check if the sxc must be re-created. This is necessary when modules are dynamically changed
        // because the configuration may change, and that is cached otherwise, resulting in toolbars with wrong config
        if (!isFirstRun)
            sxc = sxc.recreate(true);
        // check if we must show the glasses
        // this must run even after first-run, because it can be added ajax-style
        var wasEmpty = showGlassesButtonIfUninitialized(sxc);
        if (isFirstRun || !wasEmpty)
            $2sxc._toolbarManager.buildToolbars(module);
        return true;
    }
    function showGlassesButtonIfUninitialized(sxc) {
        // already initialized
        if (sxc.manage._editContext.ContentGroup.TemplateId !== 0)
            return false;
        // already has a glasses button
        var tag = $($2sxc._manage.getTag(sxc));
        if (tag.find(".sc-uninitialized").length !== 0)
            return false;
        // note: title is added on mouseover, as the translation isn't ready at page-load
        var btn = $('<div class="sc-uninitialized" onmouseover="this.title = $2sxc.translate(this.title)" title="InPage.NewElement"><div class="icon-sxc-glasses"></div></div>');
        btn.on("click", function () {
            sxc.manage.run("layout");
        });
        tag.append(btn);
        return true;
    }
});


/***/ })
/******/ ]);
//# sourceMappingURL=inpage.js.map