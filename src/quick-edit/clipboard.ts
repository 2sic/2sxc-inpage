import { Specs } from './specs';

export interface Clipboard {
  data: any;
  mark(newData: any): any;
  clear(): void;
  createSpecs(type: string, list: any, index: number): Specs;
}
