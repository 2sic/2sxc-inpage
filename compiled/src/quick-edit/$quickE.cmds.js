"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
var _quickE_modManage_1 = require("./$quickE.modManage");
var module_bootstrapper_1 = require("../x-bootstrap/module-bootstrapper");
var mm = new _quickE_modManage_1.modManage();
var cb = /** @class */ (function () {
    function cb() {
    }
    cb.prototype.delete = function (clip) {
        var sxc = module_bootstrapper_1.$2sxc(clip.list);
        return sxc.manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
    };
    cb.create = function (parent, field, index, appOrContent, list, newGuid) {
        var sxc = module_bootstrapper_1.$2sxc(list);
        return sxc.manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
    };
    return cb;
}());
exports.cb = cb;
var mod = /** @class */ (function () {
    function mod() {
    }
    mod.prototype.delete = function (clip) {
        if (!confirm('are you sure?'))
            return;
        var modId = mm.getModuleId(clip.item.className);
        mm.delete(modId);
    };
    // todo: unsure if this is a good place for this bit of code...
    mod.move = function (oldClip, newClip, from, to) {
        var modId = mm.getModuleId(oldClip.item.className);
        var pane = mm.getPaneName(newClip.list);
        mm.move(modId, pane, to);
    };
    mod.sendToPane = function () {
        var pane = _quickE___1.$quickE.main.actionsForModule.closest(_quickE___1.selectors.mod.listSelector);
        // show the pane-options
        var pl = _quickE___1.$quickE.selected.find('#paneList');
        if (!pl.is(':empty'))
            pl.empty();
        pl.append(mm.getMoveButtons(mm.getPaneName(pane)));
    };
    return mod;
}());
exports.mod = mod;
;
var CmdsStrategyFactory = /** @class */ (function () {
    function CmdsStrategyFactory() {
        this.cmds = {};
        this.cmds['cb'] = new cb();
        this.cmds['mod'] = new mod();
    }
    CmdsStrategyFactory.prototype.getCmds = function (cliptype) {
        return this.cmds[cliptype];
    };
    CmdsStrategyFactory.prototype.delete = function (clip) {
        return this.cmds[clip.type].delete(clip);
    };
    return CmdsStrategyFactory;
}());
exports.CmdsStrategyFactory = CmdsStrategyFactory;
//# sourceMappingURL=$quickE.cmds.js.map