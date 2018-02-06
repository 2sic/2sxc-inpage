import { Act } from '../commands/act';
import { Settings } from '../commands/settings';

export interface Engine {
  commands: Act;
  create(specialSettings: Settings): any;
  _linkToNgDialog(specialSettings: any): string;
  _openNgDialog(settings: any, event: any, sxc: any): any;
  executeAction(nameOrSettings: any, settings?: any, event?: any): any;
}