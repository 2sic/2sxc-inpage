"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var parameters_entity_proxy_1 = require("./parameters-entity-proxy");
var environment_1 = require("./environment");
/**
 * proxy create Environment object from JSON
 */
var EnvironmentProxy = /** @class */ (function () {
    function EnvironmentProxy() {
    }
    EnvironmentProxy.Parse = function (data) {
        return EnvironmentProxy.Create(JSON.parse(data));
    };
    EnvironmentProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        ihj_helper_1.checkNumber(data.WebsiteId, false, field + ".WebsiteId");
        ihj_helper_1.checkString(data.WebsiteUrl, false, field + ".WebsiteUrl");
        ihj_helper_1.checkNumber(data.PageId, false, field + ".PageId");
        ihj_helper_1.checkString(data.PageUrl, false, field + ".PageUrl");
        ihj_helper_1.checkArray(data.parameters, field + ".parameters");
        if (data.parameters) {
            for (var i = 0; i < data.parameters.length; i++) {
                data.parameters[i] = parameters_entity_proxy_1.ParametersEntityProxy.Create(data.parameters[i], field + ".parameters" + "[" + i + "]");
            }
        }
        if (data.parameters === undefined) {
            data.parameters = null;
        }
        ihj_helper_1.checkNumber(data.InstanceId, false, field + ".InstanceId");
        ihj_helper_1.checkString(data.SxcVersion, false, field + ".SxcVersion");
        ihj_helper_1.checkString(data.SxcRootUrl, false, field + ".SxcRootUrl");
        ihj_helper_1.checkBoolean(data.IsEditable, false, field + ".IsEditable");
        return new environment_1.Environment(data);
    };
    return EnvironmentProxy;
}());
exports.EnvironmentProxy = EnvironmentProxy;
//# sourceMappingURL=environment-proxy.js.map