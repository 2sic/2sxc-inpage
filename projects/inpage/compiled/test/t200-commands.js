"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var commands_1 = require("../src/commands/commands");
var command_definition_1 = require("../src/commands/command-definition");
var actions_1 = require("../src/contentBlock/actions");
var expand_button_config_1 = require("../src/toolbar/button/expand-button-config");
var context_1 = require("../src/context/context");
describe('Commands test suite', function () {
    var commands = commands_1.Commands.getInstance();
    it('200 number of commands', function () {
        var noOfCommands = Object.keys(commands.list).length;
        var noOfCommandsExpected = 25;
        expect(noOfCommands).toEqual(noOfCommandsExpected);
    });
    describe('/ One command test suite', function () {
        var myCustomEquality = function (first, second) {
            if (!(first instanceof command_definition_1.CommandDefinition))
                return false;
            if (!(second instanceof command_definition_1.CommandDefinition))
                return false;
            if (first.name !== second.name)
                return false;
            //if (first.buttonConfig.action !== second.buttonConfig.action) return false;
            if (first.buttonConfig.icon(this.context) !== second.buttonConfig.icon(this.context))
                return false;
            if (first.buttonConfig.title(this.context) !== second.buttonConfig.title(this.context))
                return false;
            if (first.buttonConfig.uiActionOnly(this.context) !== second.buttonConfig.uiActionOnly(this.context))
                return false;
            if (first.buttonConfig.partOfPage(this.context) !== second.buttonConfig.partOfPage(this.context))
                return false;
            //// if (first.buttonConfig.show !== second.buttonConfig.show) return false;
            //// if (first.buttonConfig.code(this.context, this.event) !== second.buttonConfig.code(this.context, this.event)) return false;
            //// if (first.buttonConfig.configureCommand(context, cmd) !== second.buttonConfig.configureCommand(context, cmd)) return false;
            if ((first.buttonConfig.dialog || second.buttonConfig.dialog) && first.buttonConfig.dialog(this.context) !== second.buttonConfig.dialog(this.context))
                return false;
            if ((first.buttonConfig.disabled || second.buttonConfig.disabled) && first.buttonConfig.disabled(this.context) !== second.buttonConfig.disabled(this.context))
                return false;
            if ((first.buttonConfig.dynamicClasses || second.buttonConfig.dynamicClasses) && first.buttonConfig.dynamicClasses(this.context) !== second.buttonConfig.dynamicClasses(this.context))
                return false;
            if ((first.buttonConfig.dynamicDisabled || second.buttonConfig.dynamicDisabled) && first.buttonConfig.dynamicDisabled() !== second.buttonConfig.dynamicDisabled())
                return false;
            if ((first.buttonConfig.dynamicClasses || second.buttonConfig.dynamicClasses) && first.buttonConfig.dynamicClasses(this.context) !== second.buttonConfig.dynamicClasses(this.context))
                return false;
            if ((first.buttonConfig.fullScreen || second.buttonConfig.fullScreen) && first.buttonConfig.fullScreen(this.context) !== second.buttonConfig.fullScreen(this.context))
                return false;
            if ((first.buttonConfig.inlineWindow || second.buttonConfig.inlineWindow) && first.buttonConfig.inlineWindow(this.context) !== second.buttonConfig.inlineWindow(this.context))
                return false;
            if ((first.buttonConfig.newWindow || second.buttonConfig.newWindow) && first.buttonConfig.newWindow(this.context) !== second.buttonConfig.newWindow(this.context))
                return false;
            // if ((first.buttonConfig.params || second.buttonConfig.params) && first.buttonConfig.params(context) !== second.buttonConfig.params(context)) return false;
            // if ((first.buttonConfig.showCondition || second.buttonConfig.showCondition) && first.buttonConfig.showCondition(this.context) !== second.buttonConfig.showCondition(this.context)) return false;
            return true;
        };
        beforeEach(function () {
            this.editContext2 = {
                "Environment": {
                    "WebsiteId": 0,
                    "WebsiteUrl": "//2sxc914lts-dnn742.dnndev.me/",
                    "PageId": 93,
                    "PageUrl": "http://2sxc914lts-dnn742.dnndev.me/TB3",
                    "parameters": [
                        { "Key": "TabId", "Value": "93" },
                        { "Key": "language", "Value": "en-US" }
                    ],
                    "InstanceId": 2507,
                    "SxcVersion": "9.14.0.27116",
                    "SxcRootUrl": "/",
                    "IsEditable": true
                },
                "User": {
                    "CanDesign": true,
                    "CanDevelop": true
                },
                "Language": {
                    "Current": "en-us",
                    "Primary": "en-us",
                    "All": []
                },
                "ContentBlock": {
                    "ShowTemplatePicker": true,
                    "IsEntity": false,
                    "VersioningRequirements": "DraftOptional",
                    "Id": 2507,
                    "ParentFieldName": null,
                    "ParentFieldSortOrder": 0,
                    "PartOfPage": true
                },
                "ContentGroup": {
                    "IsCreated": true,
                    "IsList": true,
                    "TemplateId": 4994,
                    "QueryId": null,
                    "ContentTypeName": "5a3932e9-cff0-46a2-a465-d2370154c39e",
                    "AppUrl": "/Portals/0/2sxc/TestToolbar",
                    "AppSettingsId": null,
                    "AppResourcesId": null,
                    "IsContent": false,
                    "HasContent": true,
                    "SupportsAjax": false,
                    "ZoneId": 3,
                    "AppId": 17,
                    "Guid": "bacde468-fe3c-4993-8b0b-b6813f5141cc",
                    "Id": 4995
                }, "error": { "type": null }
            };
            this.context = context_1.createContextFromEditContext(this.editContext2);
            this.event = window.event;
            jasmine.addCustomEqualityTester(myCustomEquality);
        });
        it('/ 210 add command', function () {
            this.command = commands.get('add');
            this.button = this.command.buttonConfig;
            this.context.button = this.button;
            this.action = {
                params: {
                    useModuleList: true,
                    sortOrder: 0,
                    contentBlock: "dummy"
                }
            };
            this.context.button.action = this.action;
            this.commandExpected = new command_definition_1.CommandDefinition();
            this.name = 'add';
            this.translateKey = 'AddDemo';
            this.icon = 'plus-circled';
            this.uiOnly = false;
            this.partOfPage = true;
            var more = {
                showCondition: function (context) {
                    return (context.contentBlock.isList) && (context.button.action.params.useModuleList) && (context.button.action.params.sortOrder !== -1);
                },
                code: function (context) {
                    return actions_1.addItem(context, context.button.action.params.sortOrder + 1);
                },
            };
            this.commandExpected.name = this.name;
            this.commandExpected.buttonConfig = expand_button_config_1.getButtonConfigDefaultsV1(this.name, this.icon, this.translateKey, this.uiOnly, this.partOfPage, more);
            expect(this.command).toEqual(this.commandExpected);
        });
    });
});
//# sourceMappingURL=t200-commands.js.map