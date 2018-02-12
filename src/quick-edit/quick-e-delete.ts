import { Conf } from './conf';


export interface QuickE {
  // ReSharper restore InconsistentNaming
  reset: any;
  // copyPasteInPage(cbAction: string, list: any, index: number, type: any): any;
  // clipboard: Clipboard;
  // selectors: Selectors;
  cmds: any;
  setSecondaryActionsState(state: boolean): void;
  // selected: Selected;
  getCoordinates: any;
  positionAndAlign: any;
  modManage: any;
  main: any;
  config: Conf;
  // ReSharper disable InconsistentNaming
  _readPageConfig: any;
  // ReSharper restore InconsistentNaming
  cbActions: any;
  cachedPanes: any;
  modActions: any;
  getBodyPosition: any;
  body: any;
  refreshDomObjects: any;
  bodyOffset: any;
  contentBlocks: any;
  modules: any;
  refresh: any;
  nearestCb: any;
  findNearest: any;
  nearestMod: any;
  win: any;
  enable: any;
  // prepareToolbarInDom: Function;
  initPanes: any;
  watchMouse: any;
  start: any;
  toggleParts: any;
  // btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?:boolean, classes?: string): string;
  template: string;
}
