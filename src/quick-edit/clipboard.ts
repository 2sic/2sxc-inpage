interface IClipboard {
  data: any;
  mark(newData: any): any;
  clear(): void;
  createSpecs(type: string, list: any, index: number): ISpecs;
}