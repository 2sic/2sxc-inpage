import { Act } from '../commands/act';
import { Settings } from '../commands/settings';
import { Cmd } from '../commands/cmd';

export interface Engine {
  commands: Act;
  create(specialSettings: Settings): Cmd;
  _linkToNgDialog(specialSettings: any): string;
  _openNgDialog(settings: any, event: any, sxc: any): any;
  executeAction(nameOrSettings: any, settings?: any, event?: any): any;
}