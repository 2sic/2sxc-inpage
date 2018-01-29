import { $quickE as quickE, selectors } from './$quickE.{}';
import { modManage } from './$quickE.modManage';

let mm = new modManage();

/**
 * extend the quick edit with the core commands
 */

interface ICmds {
  delete(clip: any): any
}

export class cb implements ICmds {
  delete(clip: any): any {
    return $2sxc(clip.list).manage._getCbManipulator().delete(clip.parent, clip.field, clip.index);
  }


  static create(parent, field, index, appOrContent, list, newGuid): any {
    return $2sxc(list).manage._getCbManipulator().create(parent, field, index, appOrContent, list, newGuid);
  }
}

export class mod implements ICmds {
  delete(clip: any): void {
    if (!confirm('are you sure?')) return;
    var modId = mm.getModuleId(clip.item.className);
    mm.delete(modId);
  }

  // todo: unsure if this is a good place for this bit of code...
  static move(oldClip: any, newClip: any, from: any, to: any): void {
    var modId = mm.getModuleId(oldClip.item.className);
    var pane = mm.getPaneName(newClip.list);
    mm.move(modId, pane, to);
  }

  static sendToPane(): void {
    var pane = quickE.main.actionsForModule.closest(selectors.mod.listSelector);

    // show the pane-options
    var pl = quickE.selected.find('#paneList');
    if (!pl.is(':empty'))
      pl.empty();
    pl.append(mm.getMoveButtons(mm.getPaneName(pane)));
  }
}

interface IDictionary {
  [key: string]: ICmds;
};

export class CmdsStrategyFactory {
  cmds: IDictionary;

  constructor() {
    this.cmds = {};
    this.cmds['cb'] = new cb();
    this.cmds['mod'] = new mod();
  }

  public getCmds(cliptype: string): ICmds {
    return this.cmds[cliptype];
  }

  public delete(clip: any): ICmds {
    return this.cmds[clip.type].delete(clip);
  }
}
