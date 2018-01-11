"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rawJson = require("./ihj-config.test.json");
//const rawJson = <IhjConfig>JSON.parse('{"foo": "bar"}');
var dialogName = rawJson.dialogName; // TypeScript knows foo i a string
var sxcCacheKey = rawJson.sxcCacheKey; // TypeScript knows that baz is an optional field that may not be there.
//# sourceMappingURL=interface.test.js.map