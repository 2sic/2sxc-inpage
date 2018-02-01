"use strict";
//import { $2sxc as twoSxc } from '../x-bootstrap/module-bootstrapper';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
function translate(key) {
    // return key;
    return ($.t && $.t(key)) || key;
}
exports.translate = translate;
;
//twoSxc.translate = translate;
//# sourceMappingURL=2sxc.translate.js.map