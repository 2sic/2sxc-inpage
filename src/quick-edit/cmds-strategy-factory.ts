﻿import { Cb } from './cb';
import { Mod } from './Mod';

export class CmdsStrategyFactory {
  cmds: Dictionary;

  constructor() {
    this.cmds = {};
    this.cmds['cb'] = new Cb();
    this.cmds['mod'] = new Mod();
  }

  public getCmds(cliptype: string): Delete {
    return this.cmds[cliptype];
  }

  public delete(clip: any): Delete {
    return this.cmds[clip.type].delete(clip);
  }
}