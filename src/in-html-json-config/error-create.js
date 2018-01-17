"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
var ErrorCreate = /** @class */ (function () {
    function ErrorCreate() {
    }
    // ReSharper disable once InconsistentNaming
    ErrorCreate.Parse = function (data) {
        return ErrorCreate.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    ErrorCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.type, true, field + '.type');
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