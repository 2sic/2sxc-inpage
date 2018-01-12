import 'jasmine';
import { IhjConfig } from '../src/in-html-json-config/ihj-config';
import { IhjConfigProxy } from '../src/in-html-json-config/ihj-config-proxy';
import * as rawJson from './assets/ihj-config.test.json';
import { subtract } from '../src/add';

describe('ihj config test', () => {
  it('compare JSON', () => {

      let t1: string = JSON.stringify(rawJson);
      let ihjConfigTest: IhjConfig = IhjConfigProxy.Parse(t1);
      let t2: string = JSON.stringify(ihjConfigTest);

      console.log(t1);
      console.log(t2);
      expect(t2).toBe(t1);
  });
});



