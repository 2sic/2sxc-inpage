import { Settings } from './settings';
import { Params } from './params';

export class Command {
  settings: Settings;
  items: any; //string | string[];
  params: Params;
  addSimpleItem: Function;
  addContentGroupItem: Function;
  addContentGroupItemSetsToEditList: Function;
  generateLink: Function;
}