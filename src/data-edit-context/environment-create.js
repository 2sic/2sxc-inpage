"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
var parameters_entity_create_1 = require("./parameters-entity-create");
/**
 * create Environment object from JSON
 */
var EnvironmentCreate = /** @class */ (function () {
    function EnvironmentCreate() {
    }
    EnvironmentCreate.parse = function (data) {
        return this.create(JSON.parse(data));
    };
    EnvironmentCreate.create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.WebsiteId, false, field + '.WebsiteId');
        json_validation_helper_1.JsonValidationHelper.checkString(data.WebsiteUrl, false, field + '.WebsiteUrl');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.PageId, false, field + '.PageId');
        json_validation_helper_1.JsonValidationHelper.checkString(data.PageUrl, false, field + '.PageUrl');
        json_validation_helper_1.JsonValidationHelper.checkArray(data.parameters, field + '.parameters');
        if (data.parameters) {
            for (var i = 0; i < data.parameters.length; i++) {
                data.parameters[i] = parameters_entity_create_1.ParametersEntityCreate.create(data.parameters[i], field + '.parameters' + '[' + i + ']');
            }
        }
        if (data.parameters === undefined) {
            data.parameters = null;
        }
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.InstanceId, false, field + '.InstanceId');
        json_validation_helper_1.JsonValidationHelper.checkString(data.SxcVersion, false, field + '.SxcVersion');
        json_validation_helper_1.JsonValidationHelper.checkString(data.SxcRootUrl, false, field + '.SxcRootUrl');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.IsEditable, false, field + '.IsEditable');
        // transfer JSON data to new object
        var environment = {
            WebsiteId: data.WebsiteId,
            WebsiteUrl: data.WebsiteUrl,
            PageId: data.PageId,
            PageUrl: data.PageUrl,
            parameters: data.parameters,
            InstanceId: data.InstanceId,
            SxcVersion: data.SxcVersion,
            SxcRootUrl: data.SxcRootUrl,
            IsEditable: data.IsEditable,
        };
        return environment;
    };
    return EnvironmentCreate;
}());
exports.EnvironmentCreate = EnvironmentCreate;
//# sourceMappingURL=environment-create.js.map