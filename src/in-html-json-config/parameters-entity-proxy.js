"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var parameters_entity_1 = require("./parameters-entity");
/**
 * proxy create ParametersEntity object from JSON
 */
var ParametersEntityProxy = /** @class */ (function () {
    function ParametersEntityProxy() {
    }
    ParametersEntityProxy.Parse = function (data) {
        return ParametersEntityProxy.Create(JSON.parse(data));
    };
    ParametersEntityProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        ihj_helper_1.checkString(data.Key, false, field + ".Key");
        ihj_helper_1.checkString(data.Value, false, field + ".Value");
        return new parameters_entity_1.ParametersEntity(data);
    };
    return ParametersEntityProxy;
}());
exports.ParametersEntityProxy = ParametersEntityProxy;
//# sourceMappingURL=parameters-entity-proxy.js.map