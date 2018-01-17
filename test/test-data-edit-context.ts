import 'jasmine';
import { DataEditContext } from '../src/data-edit-context/data-edit-context';
import { DataEditContextCreate } from '../src/data-edit-context/data-edit-context-create';
import * as rawJson from './assets/ihj-config.test.json';

describe('ihj config test', () => {
  it('compare JSON', () => {

      let t1: string = JSON.stringify(rawJson);
      let dataEditContextTest: DataEditContext = DataEditContextCreate.parse(t1);
      let t2: string = JSON.stringify(dataEditContextTest);

      console.log(t1);
      console.log(t2); 

      expect(t2).toBe(t1);
  });
});
