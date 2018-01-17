"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var data_edit_context_create_1 = require("../src/data-edit-context/data-edit-context-create");
var rawJson = require("./assets/ihj-config.test.json");
describe('ihj config test', function () {
    it('compare JSON', function () {
        var t1 = JSON.stringify(rawJson);
        var dataEditContextTest = data_edit_context_create_1.DataEditContextCreate.parse(t1);
        var t2 = JSON.stringify(dataEditContextTest);
        console.log(t1);
        console.log(t2);
        expect(t2).toBe(t1);
    });
});
//# sourceMappingURL=test-data-edit-context.js.map