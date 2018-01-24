import { selectors } from './$quickE.{}';
import modManage from './$quickE.modManage';
var mm = new modManage();

// extend the quick edit with the core commands
interface ICmds {
  cb: ICb;
  mod: IMod;
}

interface ICb {
  delete(clip: any): any;
  create(parent, field, index, appOrContent, list, newGuid): any;
}

interface IMod {
  delete(clip: any): void;
  move(oldClip: any, newClip: any, from: any, to: any): void;
  sendToPane(): void;
}


$quickE.cmds = {
  cb: {
    delete: function(clip) {
      return $2sxc(clip.list).manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
    },
    create: function(parent, field, index, appOrContent, list, newGuid) {
      return $2sxc(list).manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
    }
  },
  mod: {
    delete: function(clip) {
      if (!confirm("are you sure?")) return;
      var modId = mm.getModuleId(clip.item.className);
      mm.delete(modId);
    },
    // todo: unsure if this is a good place for this bit of code...
    move: function(oldClip, newClip, from, to) {
      var modId = mm.getModuleId(oldClip.item.className);
      var pane = mm.getPaneName(newClip.list);
      mm.move(modId, pane, to);
    },
    sendToPane: function() {
      var pane = $quickE.main.actionsForModule.closest(selectors.mod.listSelector);

      // show the pane-options
      var pl = $quickE.selected.find("#paneList");
      if (!pl.is(":empty"))
        pl.empty();
      pl.append(mm.getMoveButtons(mm.getPaneName(pane)));

    }
  }
};
