import { Settings } from './settings';
import { Params } from './params';

export class Cmd {
  settings: Settings;
  items: any; //string | string[];
  params: Params;
  addSimpleItem: Function;
  addContentGroupItem: Function;
  addContentGroupItemSetsToEditList: Function;
  generateLink: Function;
}