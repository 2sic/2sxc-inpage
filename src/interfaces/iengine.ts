interface IEngine {
  commands: Function;
  create(specialSettings: any): any;
  _linkToNgDialog(specialSettings: any): string;
  _openNgDialog(settings: any, event: any, sxc: any): any;
  executeAction(nameOrSettings: any, settings?: any, event?: any): any;
}