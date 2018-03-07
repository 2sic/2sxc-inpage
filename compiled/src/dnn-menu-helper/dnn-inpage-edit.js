"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sxc_1 = require("../x-bootstrap/sxc");
var api_1 = require("../manage/api");
var context_1 = require("../context/context");
/**
 * Maps actions of the module menu to JS actions - needed because onclick event can't be set (actually, a bug in DNN)
 */
var ActionMenuMapper = /** @class */ (function () {
    function ActionMenuMapper(moduleId) {
        var _this = this;
        this.changeLayoutOrContent = function () { _this.run(context_1.context(_this.tag), 'layout'); };
        this.addItem = function () { _this.run(context_1.context(_this.tag), 'add', { useModuleList: true, sortOrder: 0 }); };
        this.edit = function () { _this.run(context_1.context(_this.tag), 'edit', { useModuleList: true, sortOrder: 0 }); };
        this.adminApp = function () { _this.run(context_1.context(_this.tag), 'app'); };
        this.adminZone = function () { _this.run(context_1.context(_this.tag), 'zone'); };
        this.develop = function () { _this.run(context_1.context(_this.tag), 'template-develop'); };
        var sxc = sxc_1.getSxcInstance(moduleId);
        this.tag = api_1.getTag(sxc);
        this.run = sxc.manage.run2;
    }
    return ActionMenuMapper;
}());
exports.ActionMenuMapper = ActionMenuMapper;
window.$2sxcActionMenuMapper = function (moduleId) {
    return new ActionMenuMapper(moduleId);
};
//# sourceMappingURL=dnn-inpage-edit.js.map