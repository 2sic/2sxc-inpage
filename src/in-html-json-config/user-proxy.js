"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var user_1 = require("./user");
/**
 * proxy create User object from JSON
 */
var UserProxy = /** @class */ (function () {
    function UserProxy() {
    }
    UserProxy.Parse = function (data) {
        return UserProxy.Create(JSON.parse(data));
    };
    UserProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        ihj_helper_1.checkBoolean(data.CanDesign, false, field + ".CanDesign");
        ihj_helper_1.checkBoolean(data.CanDevelop, false, field + ".CanDevelop");
        return new user_1.User(data);
    };
    return UserProxy;
}());
exports.UserProxy = UserProxy;
//# sourceMappingURL=user-proxy.js.map