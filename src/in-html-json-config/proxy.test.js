"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_proxy_1 = require("./ihj-config-proxy");
var rawJson = require("./ihj-config.test.json");
var t1 = JSON.stringify(rawJson);
var ihjConfigTest = ihj_config_proxy_1.IhjConfigProxy.Parse(t1);
var t2 = JSON.stringify(ihjConfigTest);
if (t1 === t2) {
    // yea baby!
}
//# sourceMappingURL=proxy.test.js.map