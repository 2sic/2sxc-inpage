interface ISelected {
  toggle(target: any, type?: any): any;
  hide(): void;
  target: any;
  find(selector: string): any;
}