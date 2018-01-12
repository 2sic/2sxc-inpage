import { IhjConfig } from '../src/in-html-json-config/ihj-config';
import { IhjConfigProxy } from '../src/in-html-json-config/ihj-config-proxy';
import * as rawJson from './ihj-config.test.json';

let t1: string = JSON.stringify(rawJson);

let ihjConfigTest: IhjConfig = IhjConfigProxy.Parse(t1);

let t2: string = JSON.stringify(ihjConfigTest);

if (t1 === t2) {
  // yea baby!
}

