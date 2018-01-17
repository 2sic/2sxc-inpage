"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
var ErrorCreate = /** @class */ (function () {
    function ErrorCreate() {
    }
    ErrorCreate.parse = function (data) {
        return ErrorCreate.create(JSON.parse(data));
    };
    ErrorCreate.create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        json_validation_helper_1.JsonValidationHelper.checkString(data.type, true, field + '.type');
        // transfer JSON data to new object
        var error = {
            type: data.type
        };
        return error;
    };
    return ErrorCreate;
}());
exports.ErrorCreate = ErrorCreate;
//# sourceMappingURL=error-create.js.map