"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
/**
 * create ParametersEntity object from JSON
 */
var ParametersEntityCreate = /** @class */ (function () {
    function ParametersEntityCreate() {
    }
    // ReSharper disable once InconsistentNaming
    ParametersEntityCreate.Parse = function (data) {
        return this.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    ParametersEntityCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.Key, false, field + '.Key');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.Value, false, field + '.Value');
        // transfer JSON data to new object
        var parametersEntity = {
            Key: data.Key,
            Value: data.Value
        };
        return parametersEntity;
    };
    return ParametersEntityCreate;
}());
exports.ParametersEntityCreate = ParametersEntityCreate;
//# sourceMappingURL=parameters-entity-create.js.map