"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
var parameters_entity_create_1 = require("./parameters-entity-create");
/**
 * create Environment object from JSON
 */
var EnvironmentCreate = /** @class */ (function () {
    function EnvironmentCreate() {
    }
    // ReSharper disable once InconsistentNaming
    EnvironmentCreate.Parse = function (data) {
        return EnvironmentCreate.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    EnvironmentCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.WebsiteId, false, field + '.WebsiteId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.WebsiteUrl, false, field + '.WebsiteUrl');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.PageId, false, field + '.PageId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.PageUrl, false, field + '.PageUrl');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkArray(data.parameters, field + '.parameters');
        if (data.parameters) {
            for (var i = 0; i < data.parameters.length; i++) {
                data.parameters[i] = parameters_entity_create_1.ParametersEntityCreate.Create(data.parameters[i], field + '.parameters' + '[' + i + ']');
            }
        }
        if (data.parameters === undefined) {
            data.parameters = null;
        }
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.InstanceId, false, field + '.InstanceId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.SxcVersion, false, field + '.SxcVersion');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.SxcRootUrl, false, field + '.SxcRootUrl');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.IsEditable, false, field + '.IsEditable');
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