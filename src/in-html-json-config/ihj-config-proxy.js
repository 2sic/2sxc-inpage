"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var ihj_config_1 = require("./ihj-config");
var environment_proxy_1 = require("./environment-proxy");
var user_proxy_1 = require("./user-proxy");
var language_proxy_1 = require("./language-proxy");
var content_block_proxy_1 = require("./content-block-proxy");
var content_group_proxy_1 = require("./content-group-proxy");
var error_proxy_1 = require("./error-proxy");
/**
 * proxy create IhjConfig object from JSON
 *
 */
var IhjConfigProxy = /** @class */ (function () {
    function IhjConfigProxy() {
    }
    IhjConfigProxy.Parse = function (data) {
        return IhjConfigProxy.Create(JSON.parse(data));
    };
    IhjConfigProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        data.Environment = environment_proxy_1.EnvironmentProxy.Create(data.Environment, field + ".Environment");
        data.User = user_proxy_1.UserProxy.Create(data.User, field + ".User");
        data.Language = language_proxy_1.LanguageProxy.Create(data.Language, field + ".Language");
        data.ContentBlock = content_block_proxy_1.ContentBlockProxy.Create(data.ContentBlock, field + ".ContentBlock");
        data.ContentGroup = content_group_proxy_1.ContentGroupProxy.Create(data.ContentGroup, field + ".ContentGroup");
        data.error = error_proxy_1.ErrorProxy.Create(data.error, field + ".error");
        return new ihj_config_1.IhjConfig(data);
    };
    return IhjConfigProxy;
}());
exports.IhjConfigProxy = IhjConfigProxy;
//# sourceMappingURL=ihj-config-proxy.js.map