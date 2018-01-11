import { IhjConfig } from './ihj-config';
import { IhjConfigProxy } from './ihj-config-proxy';
import * as rawJson from "./ihj-config.test.json";

let t1: string = JSON.stringify(rawJson);

let ihjConfigTest: IhjConfig = IhjConfigProxy.Parse(t1);

let t2: string = JSON.stringify(ihjConfigTest);

if (t1 === t2) {
  // yea baby!
}

