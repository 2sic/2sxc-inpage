export class ButtonAction {
  name: string; // the command name from the action list
  code: string; // custom code if used
  params: any[]; // custom parameters if used or if these override other params
  constructor(name: string, params?: any[]) {
    this.name = name; // will auto - lookup the action and use the defaults
    this.params = params; // same, but use custom params
  }
}
