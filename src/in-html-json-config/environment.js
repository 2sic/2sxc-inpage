"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var parameters_entity_proxy_1 = require("./parameters-entity-proxy");
/**
 * Environment class
 */
var Environment = /** @class */ (function () {
    function Environment(data) {
        this.WebsiteId = data.WebsiteId;
        this.WebsiteUrl = data.WebsiteUrl;
        this.PageId = data.PageId;
        this.PageUrl = data.PageUrl;
        this.parameters = data.parameters;
        this.InstanceId = data.InstanceId;
        this.SxcVersion = data.SxcVersion;
        this.SxcRootUrl = data.SxcRootUrl;
        this.IsEditable = !data.IsEditable;
    }
    // ReSharper restore InconsistentNaming
    Environment.Parse = function (data) {
        return this.Create(JSON.parse(data));
    };
    Environment.Create = function (data, field) {
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
                data.parameters[i] =
                    parameters_entity_proxy_1.ParametersEntityProxy.Create(data.parameters[i], field + ".parameters" + "[" + i + "]");
            }
        }
        if (data.parameters === undefined) {
            data.parameters = null;
        }
        ihj_helper_1.checkNumber(data.InstanceId, false, field + ".InstanceId");
        ihj_helper_1.checkString(data.SxcVersion, false, field + ".SxcVersion");
        ihj_helper_1.checkString(data.SxcRootUrl, false, field + ".SxcRootUrl");
        ihj_helper_1.checkBoolean(data.IsEditable, false, field + ".IsEditable");
        return new Environment(data);
    };
    return Environment;
}());
exports.Environment = Environment;
//# sourceMappingURL=environment.js.map