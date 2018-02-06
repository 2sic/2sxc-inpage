"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commands_instanceCommands_1 = require("./commands.instanceCommands");
var contentBlock_templates_1 = require("../contentBlock/contentBlock.templates");
var _2sxc__lib_extend_1 = require("../lib-helpers/2sxc._lib.extend");
var create_1 = require("./create");
var link_to_ng_dialog_1 = require("./link-to-ng-dialog");
var open_ng_dialog_1 = require("./open-ng-dialog");
function instanceEngine(sxc, editContext) {
    var engine = {
        commands: commands_instanceCommands_1.initializeInstanceCommands(editContext),
        // assemble an object which will store the configuration and execute it
        create: function (specialSettings) {
            return create_1.create(sxc, editContext, specialSettings);
        },
        // create a dialog link
        _linkToNgDialog: function (specialSettings) {
            return link_to_ng_dialog_1.linkToNgDialog(sxc, editContext, specialSettings);
        },
        // open a new dialog of the angular-ui
        _openNgDialog: function (settings, event, sxc) {
            return open_ng_dialog_1.openNgDialog(settings, event, sxc, editContext);
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