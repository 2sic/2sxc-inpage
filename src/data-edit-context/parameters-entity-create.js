"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
/**
 * create ParametersEntity object from JSON
 */
var ParametersEntityCreate = /** @class */ (function () {
    function ParametersEntityCreate() {
    }
    ParametersEntityCreate.parse = function (data) {
        return this.create(JSON.parse(data));
    };
    ParametersEntityCreate.create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        json_validation_helper_1.JsonValidationHelper.checkString(data.Key, false, field + '.Key');
        json_validation_helper_1.JsonValidationHelper.checkString(data.Value, false, field + '.Value');
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