﻿import { ModConfig } from '../../commands/mod-config';
import { Settings } from '../../commands/settings';

export class ButtonAction {
  // name: string; // the command name from the action list
  // params: any[]; // custom parameters if used or if these override other params
  // code: string; // custom code if used
  code?(settings: Settings, event: ModConfig, sxc: SxcInstanceWithInternals): void;

  constructor(public name: string, public params?: any[]) { }
}
