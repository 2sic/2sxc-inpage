// ReSharper disable InconsistentNaming
interface i$quickE {
  // ReSharper restore InconsistentNaming
  reset: any;
  //copyPasteInPage(cbAction: string, list: any, index: number, type: any): any;
  clipboard: IClipboard;
  //selectors: Selectors;
  cmds: any;
  setSecondaryActionsState(state: boolean): void;
  selected: ISelected;
  getCoordinates: any;
  positionAndAlign: any;
  modManage: any;
  main: any;
  config: IConf;
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
  //prepareToolbarInDom: Function;
  initPanes: any;
  watchMouse: any;
  start: any;
  toggleParts: any;
  //btn(action: string, icon: string, i18N: string, invisible?: boolean, unavailable?:boolean, classes?: string): string;
  template: string;
}

declare var $quickE: i$quickE;

interface IClipboard {
  data: any;
  mark(newData: any): any;
  clear(): void;
  createSpecs(type: string, list: any, index: number): ISpecs;
}

interface ISpecs {
  parent: any;
  field: any;
  list: any;
  item: any;
  index: number;
  type: any;
}

interface ISelected {
  toggle(target: any, type?: any): any;
  hide(): void;
  target: any;
  find(selector: string): any;
}

interface IConf {
  enable: boolean;
  innerBlocks: {
    enable: boolean | string | null;
  },
  modules: {
    enable: boolean | string | null;
  };
  getAttribute?(configAttr: string): any;
  guid?: any;
}