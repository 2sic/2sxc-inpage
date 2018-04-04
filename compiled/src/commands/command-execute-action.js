"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var templates_1 = require("../contentBlock/templates");
var command_open_ng_dialog_1 = require("./command-open-ng-dialog");
var commands_1 = require("./commands");
var button_action_1 = require("../toolbar/button/button-action");
var button_config_1 = require("../toolbar/button/button-config");
var settings_adapter_1 = require("../toolbar/adapters/settings-adapter");
var has_log_1 = require("../logging/has-log");
var Engine = /** @class */ (function (_super) {
    __extends(Engine, _super);
    function Engine(parentLog) {
        return _super.call(this, 'Cmd.Exec', parentLog) || this;
    }
    Engine.prototype.detectParamsAndRun = function (context, nameOrSettings, eventOrSettings, event) {
        this.log.add("detecting params and running - has " + arguments.length + " params");
        var settings;
        var thirdParamIsEvent = (!event && eventOrSettings && typeof eventOrSettings.altKey !== 'undefined');
        this.log.add("might cycle parameters, in case not all were given. third is event=" + thirdParamIsEvent);
        if (thirdParamIsEvent) {
            this.log.add('cycling parameters as event was missing & eventOrSettings seems to be an event; settings must be empty');
            event = eventOrSettings; // move it to the correct variable
            settings = (nameOrSettings || {});
        }
        else
            settings = (eventOrSettings || {});
        // ensure we have the right event despite browser differences
        event = event || window.event;
        return this.run(context, settings, event);
    };
    /**
     * run a command
     * this method expects a clear order of parameters
     * @param context
     * @param settings
     * @param event
     */
    Engine.prototype.run = function (context, settings, event) {
        settings = this.expandSettingsWithDefaults(settings);
        var origEvent = event;
        var name = settings.action;
        var contentType = settings.contentType;
        this.log.add("run command " + name + " for type " + contentType);
        // Toolbar API v2
        var newButtonAction = new button_action_1.ButtonAction(name, contentType, settings);
        newButtonAction.commandDefinition = commands_1.Commands.getInstance().get(name);
        var newButtonConfig = new button_config_1.ButtonConfig(newButtonAction);
        newButtonConfig.name = name;
        var button = context.button = Object.assign(newButtonConfig, newButtonAction.commandDefinition.buttonConfig, settings_adapter_1.settingsAdapter(settings)); // merge conf & settings, but settings has higher priority
        // todo: stv, fix this in case that is function
        if (!button.dialog) {
            this.log.add("button.dialog method missing, must be old implementation which used the action-name - generating method");
            button.dialog = function () { return name; };
        }
        // todo: stv, fix this in case that is function
        if (!button.code) {
            this.log.add("simple button without code - generating code to open standard dialog");
            button.code = function (contextParam, event) {
                return command_open_ng_dialog_1.commandOpenNgDialog(contextParam, event);
            };
        }
        if (button.uiActionOnly(context)) {
            this.log.add("just a UI command, will not run pre-flight to ensure content-block - now running the code");
            return button.code(context, origEvent);
        }
        // if more than just a UI-action, then it needs to be sure the content-group is created first
        this.log.add("command might change data, will wrap in pre-flight to ensure content-block");
        var prepare = templates_1.prepareToAddContent(context, settings.useModuleList)
            .then(function () {
            context.button.code(context, origEvent);
        });
        return prepare;
    };
    /**
     * Take a settings-name or partial settings object,
     * and return a full settings object with all defaults from
     * the command definition
     * @param log
     * @param settings
     * @param nameOrSettings
     */
    Engine.prototype.expandSettingsWithDefaults = function (nameOrSettings) {
        var nameIsString = typeof nameOrSettings === 'string';
        this.log.add("expanding settings; name is string: " + nameIsString + "; name = " + nameOrSettings);
        // check if name is name (string) or object (settings)
        var settings = (nameIsString
            ? Object.assign(nameOrSettings || {}, { action: nameOrSettings }) // place the name as an action-name into a command-object
            : nameOrSettings);
        var name = settings.action;
        this.log.add("will add defaults for " + name + " from buttonConfig");
        var conf = commands_1.Commands.getInstance().get(name).buttonConfig;
        var full = Object.assign({}, conf, settings); // merge conf & settings, but settings has higher priority
        return full;
    };
    return Engine;
}(has_log_1.HasLog));
exports.Engine = Engine;
//# sourceMappingURL=command-execute-action.js.map