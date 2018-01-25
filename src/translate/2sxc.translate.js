"use strict";
/**
 * provide an official translate API for 2sxc - currently internally using a jQuery library, but this may change
 * @param key
 */
Object.defineProperty(exports, "__esModule", { value: true });
function translate(key) {
    // return key;
    return ($.t && $.t(key)) || key;
}
exports.translate = translate;
;
//# sourceMappingURL=2sxc.translate.js.map