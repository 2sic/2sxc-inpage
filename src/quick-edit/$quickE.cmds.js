"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE___1 = require("./$quickE.{}");
var _quickE_modManage_1 = require("./$quickE.modManage");
var mm = new _quickE_modManage_1.modManage();
var cb = /** @class */ (function () {
    function cb() {
    }
    cb.prototype.delete = function (clip) {
        return $2sxc(clip.list).manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
    };
    cb.create = function (parent, field, index, appOrContent, list, newGuid) {
        return $2sxc(list).manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
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
        var pane = $quickE.main.actionsForModule.closest(_quickE___1.selectors.mod.listSelector);
        // show the pane-options
        var pl = $quickE.selected.find('#paneList');
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