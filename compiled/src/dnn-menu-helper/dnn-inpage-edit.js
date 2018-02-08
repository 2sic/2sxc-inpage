"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
var ActionMenuMapper = /** @class */ (function () {
    function ActionMenuMapper(moduleId) {
        var _this = this;
        this.changeLayoutOrContent = function () { _this.run('layout'); };
        this.addItem = function () { _this.run('add', { useModuleList: true, sortOrder: 0 }); };
        this.edit = function () { _this.run('edit', { useModuleList: true, sortOrder: 0 }); };
        this.adminApp = function () { _this.run('app'); };
        this.adminZone = function () { _this.run('zone'); };
        this.develop = function () { _this.run('template-develop'); };
        var sxc = module_bootstrapper_1.$2sxc(moduleId);
        this.run = sxc.manage.run;
    }
    return ActionMenuMapper;
}());
exports.ActionMenuMapper = ActionMenuMapper;
window.$2sxcActionMenuMapper = function (moduleId) {
    return new ActionMenuMapper(moduleId);
};
//# sourceMappingURL=dnn-inpage-edit.js.map