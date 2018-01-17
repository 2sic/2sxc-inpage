"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
/**
 * create User object from JSON
 */
var UserCreate = /** @class */ (function () {
    function UserCreate() {
    }
    // ReSharper disable once InconsistentNaming
    UserCreate.Parse = function (data) {
        return UserCreate.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    UserCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.CanDesign, false, field + '.CanDesign');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.CanDevelop, false, field + '.CanDevelop');
        // transfer JSON data to new object
        var user = {
            CanDesign: data.CanDesign,
            CanDevelop: data.CanDevelop
        };
        return user;
    };
    return UserCreate;
}());
exports.UserCreate = UserCreate;
//# sourceMappingURL=user-create.js.map