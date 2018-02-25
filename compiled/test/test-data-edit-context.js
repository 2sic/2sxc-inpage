"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var jsonTest2 = require("./assets/data-edit-context-2.test.json");
describe('DataEditContextCreate test', function () {
    //it('compare test JSON from #10', () => {
    //    let inHtmlConfigJson: string = JSON.stringify(jsonTest1);
    //    let dataEditContext: DataEditContext = DataEditContextCreate.parse(inHtmlConfigJson);
    //    let dataEditContextJson: string = JSON.stringify(dataEditContext);
    //    console.log(inHtmlConfigJson);
    //    console.log(dataEditContextJson); 
    //    expect(dataEditContextJson).toBe(inHtmlConfigJson);
    //});
    it('compare test 2 JSON from BLOG App', function () {
        var inHtmlConfigJson = JSON.stringify(jsonTest2);
        var dataEditContext = JSON.parse(inHtmlConfigJson);
        var dataEditContextJson = JSON.stringify(dataEditContext);
        console.log(inHtmlConfigJson);
        console.log(dataEditContextJson);
        expect(dataEditContextJson).toBe(inHtmlConfigJson);
    });
});
//# sourceMappingURL=test-data-edit-context.js.map