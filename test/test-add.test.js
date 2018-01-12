"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var add_1 = require("../src/add");
describe('subtract method', function () {
    it('subtracts 2 numbers', function () {
        expect(add_1.subtract(2, 4)).toBe(-2);
    });
});
//# sourceMappingURL=test-add.test.js.map