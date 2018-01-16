"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var language_1 = require("./language");
/**
 * proxy create Language object from JSON
 */
var LanguageProxy = /** @class */ (function () {
    function LanguageProxy() {
    }
    LanguageProxy.Parse = function (data) {
        return LanguageProxy.Create(JSON.parse(data));
    };
    LanguageProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        ihj_helper_1.checkString(data.Current, false, field + ".Current");
        ihj_helper_1.checkString(data.Primary, false, field + ".Primary");
        ihj_helper_1.checkArray(data.All, field + ".All");
        if (data.All) {
            for (var i = 0; i < data.All.length; i++) {
                ihj_helper_1.checkNull(data.All[i], field + ".All" + "[" + i + "]");
                if (data.All[i] === undefined) {
                    data.All[i] = null;
                }
            }
        }
        if (data.All === undefined) {
            data.All = null;
        }
        return new language_1.Language(data);
    };
    return LanguageProxy;
}());
exports.LanguageProxy = LanguageProxy;
//# sourceMappingURL=language-proxy.js.map