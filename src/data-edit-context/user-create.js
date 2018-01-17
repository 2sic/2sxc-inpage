"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
/**
 * create User object from JSON
 */
var UserCreate = /** @class */ (function () {
    function UserCreate() {
    }
    UserCreate.parse = function (data) {
        return this.create(JSON.parse(data));
    };
    UserCreate.create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.CanDesign, false, field + '.CanDesign');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.CanDevelop, false, field + '.CanDevelop');
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