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
var command_base_1 = require("../command-base");
/**
 * import this module to commands.ts
 */
var AppSettings = /** @class */ (function (_super) {
    __extends(AppSettings, _super);
    function AppSettings() {
        var _this = _super.call(this) || this;
        _this.makeDef('app-settings', 'AppSettings', 'sliders', true, false, {
            dialog: function (context) { return 'edit'; },
            disabled: function (context) {
                return context.app.settingsId === null;
            },
            title: function (context) { return "Toolbar.AppSettings" + (context.app.settingsId === null ? 'Disabled' : ''); },
            showCondition: function (context) {
                return (context.user.canDesign) && (!context.app.isContent); // only if settings exist, or are 0 (to be created)
            },
            configureCommand: function (context, command) {
                command.items = [{ EntityId: context.app.settingsId }];
            },
            dynamicClasses: function (context) {
                return context.app.settingsId !== null ? '' : 'empty'; // if it doesn't have a query, make it less strong
            },
        });
        return _this;
    }
    return AppSettings;
}(command_base_1.CommandBase));
exports.AppSettings = AppSettings;
// ReSharper disable once UnusedLocals
var cmd = new AppSettings();
//# sourceMappingURL=app-settings.js.map