"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jasmine");
var ihj_config_proxy_1 = require("../src/in-html-json-config/ihj-config-proxy");
var rawJson = require("./assets/ihj-config.test.json");
describe('ihj config test', function () {
    it('compare JSON', function () {
        var t1 = JSON.stringify(rawJson);
        var ihjConfigTest = ihj_config_proxy_1.IhjConfigProxy.Parse(t1);
        var t2 = JSON.stringify(ihjConfigTest);
        console.log(t1);
        console.log(t2);
        expect(t2).toBe(t1);
    });
});
//# sourceMappingURL=test-proxy.js.map