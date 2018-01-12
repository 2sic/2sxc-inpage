import { IhjConfig } from '../src/in-html-json-config/ihj-config';
import * as rawJson from "./ihj-config.test.json";

//const rawJson = <IhjConfig>JSON.parse('{"foo": "bar"}');
let dialogName = rawJson.dialogName; // TypeScript knows foo i a string
let sxcCacheKey = rawJson.sxcCacheKey; // TypeScript knows that baz is an optional field that may not be there.