"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_instanceCommands_1 = require("./commands.instanceCommands");
var _2sxc__quickDialog_1 = require("../quick-dialog/2sxc._quickDialog");
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
var contentBlock_render_1 = require("../contentBlock/contentBlock.render");
var contentBlock_templates_1 = require("../contentBlock/contentBlock.templates");
var _2sxc__lib_extend_1 = require("../lib-helpers/2sxc._lib.extend");
var create_1 = require("./create");
function instanceEngine(sxc, editContext) {
    var engine = {
        commands: commands_instanceCommands_1.initializeInstanceCommands(editContext),
        // assemble an object which will store the configuration and execute it
        create: function (specialSettings) {
            return create_1.create(sxc, editContext, specialSettings);
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
        _openNgDialog: function (settings, event, sxc) {
            // the callback will handle events after closing the dialog
            // and reload the in-page view w/ajax or page reload
            var callback = function () {
                contentBlock_render_1.reloadAndReInitialize(sxc);
                // 2017-09-29 2dm: no call of _openNgDialog seems to give a callback ATM closeCallback();
            };
            var link = engine._linkToNgDialog(settings); // the link contains everything to open a full dialog (lots of params added)
            if (settings.inlineWindow)
                return _2sxc__quickDialog_1.showOrToggle(sxc, link, callback, settings.fullScreen /* settings.dialog === "item-history"*/, settings.dialog);
            if (settings.newWindow || (event && event.shiftKey))
                return window.open(link);
            return module_bootstrapper_1.$2sxc.totalPopup.open(link, callback);
        },
        // ToDo: remove dead code
        executeAction: function (nameOrSettings, settings, event) {
            // cycle parameters, in case it was called with 2 params only
            if (!event && settings && typeof settings.altKey !== 'undefined') {
                event = settings; // move it to the correct variable
                settings = {}; // clear the settings variable, as none was provided
            }
            // pre-save event because afterwards we have a promise, so the event-object changes; funky syntax is because of browser differences
            var origEvent = event || window.event;
            // check if name is name (string) or object (settings)
            settings = (typeof nameOrSettings === 'string') ?
                _2sxc__lib_extend_1.extend(settings || {}, {
                    "action": nameOrSettings
                }) // place the name as an action-name into a command-object
                :
                    nameOrSettings;
            var conf = engine.commands[settings.action];
            settings = _2sxc__lib_extend_1.extend({}, conf, settings); // merge conf & settings, but settings has higher priority
            if (!settings.dialog)
                settings.dialog = settings.action; // old code uses "action" as the parameter, now use verb ? dialog
            if (!settings.code)
                settings.code = engine._openNgDialog; // decide what action to perform
            if (conf.uiActionOnly)
                return settings.code(settings, origEvent, sxc);
            // if more than just a UI-action, then it needs to be sure the content-group is created first
            return contentBlock_templates_1.prepareToAddContent(sxc, settings.useModuleList)
                .then(function () { return settings.code(settings, origEvent, sxc); });
        }
    };
    return engine;
}
exports.instanceEngine = instanceEngine;
;
//# sourceMappingURL=commands.engine.js.map