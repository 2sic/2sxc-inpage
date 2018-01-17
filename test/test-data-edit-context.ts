import 'jasmine';
import { DataEditContext } from '../src/data-edit-context/data-edit-context';
import { DataEditContextCreate } from '../src/data-edit-context/data-edit-context-create';
import * as rawJson from './assets/data-edit-context.test.json';

describe('ihj config test', () => {
  it('compare JSON', () => {

      let inHtmlConfigJson: string = JSON.stringify(rawJson);
      let dataEditContext: DataEditContext = DataEditContextCreate.parse(inHtmlConfigJson);
      let dataEditContextJson: string = JSON.stringify(dataEditContext);

      console.log(inHtmlConfigJson);
      console.log(dataEditContextJson); 

      expect(dataEditContextJson).toBe(inHtmlConfigJson);
  });
});
