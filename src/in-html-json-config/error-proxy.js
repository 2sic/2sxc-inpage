"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var error_1 = require("./error");
var ErrorProxy = /** @class */ (function () {
    function ErrorProxy() {
    }
    ErrorProxy.Parse = function (data) {
        return ErrorProxy.Create(JSON.parse(data));
    };
    ErrorProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        ihj_helper_1.checkString(data.type, true, field + ".type");
        return new error_1.Error(data);
    };
    return ErrorProxy;
}());
exports.ErrorProxy = ErrorProxy;
//# sourceMappingURL=error-proxy.js.map