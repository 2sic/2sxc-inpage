// ReSharper disable InconsistentNaming
interface i$quickE {
  // ReSharper restore InconsistentNaming
  reset: any;
  copyPasteInPage(cbAction: string, list: any, index: number, type: any): any;
  clipboard: IClipboard;
  selectors: ISelectors;
  cmds: any;
  setSecondaryActionsState(state: boolean): void;
  selected: ISelected;
  getCoordinates: any;
  positionAndAlign: any;
  modManage: any;
  main: any;
  config: any;
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
  prepareToolbarInDom: Function;
  initPanes: any;
  watchMouse: any;
  start: any;
  toggleParts: any;
  btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?:boolean, classes?: string): string;
  template: string;
}

declare var $quickE: i$quickE;
