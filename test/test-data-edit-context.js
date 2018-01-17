"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var data_edit_context_create_1 = require("../src/data-edit-context/data-edit-context-create");
var rawJson = require("./assets/data-edit-context.test.json");
describe('ihj config test', function () {
    it('compare JSON', function () {
        var inHtmlConfigJson = JSON.stringify(rawJson);
        var dataEditContext = data_edit_context_create_1.DataEditContextCreate.parse(inHtmlConfigJson);
        var dataEditContextJson = JSON.stringify(dataEditContext);
        console.log(inHtmlConfigJson);
        console.log(dataEditContextJson);
        expect(dataEditContextJson).toBe(inHtmlConfigJson);
    });
});
//# sourceMappingURL=test-data-edit-context.js.map