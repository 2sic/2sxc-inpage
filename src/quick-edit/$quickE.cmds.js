"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _quickE_modManage_1 = require("./$quickE.modManage");
var mm = new _quickE_modManage_1.default();
$quickE.cmds = {
    cb: {
        delete: function (clip) {
            return $2sxc(clip.list).manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
        },
        create: function (parent, field, index, appOrContent, list, newGuid) {
            return $2sxc(list).manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
        }
    },
    mod: {
        delete: function (clip) {
            if (!confirm("are you sure?"))
                return;
            var modId = mm.getModuleId(clip.item.className);
            mm.delete(modId);
        },
        // todo: unsure if this is a good place for this bit of code...
        move: function (oldClip, newClip, from, to) {
            var modId = mm.getModuleId(oldClip.item.className);
            var pane = mm.getPaneName(newClip.list);
            mm.move(modId, pane, to);
        },
        sendToPane: function () {
            var pane = $quickE.main.actionsForModule.closest($quickE.selectors.mod.listSelector);
            // show the pane-options
            var pl = $quickE.selected.find("#paneList");
            if (!pl.is(":empty"))
                pl.empty();
            pl.append(mm.getMoveButtons(mm.getPaneName(pane)));
        }
    }
};
//# sourceMappingURL=$quickE.cmds.js.map