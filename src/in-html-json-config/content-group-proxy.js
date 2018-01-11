"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var content_group_1 = require("./content-group");
/**
 * proxy create ContentGroup object from JSON
 */
var ContentGroupProxy = /** @class */ (function () {
    function ContentGroupProxy() {
    }
    ContentGroupProxy.Parse = function (data) {
        return ContentGroupProxy.Create(JSON.parse(data));
    };
    ContentGroupProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        ihj_helper_1.checkBoolean(data.IsCreated, false, field + ".IsCreated");
        ihj_helper_1.checkBoolean(data.IsList, false, field + ".IsList");
        ihj_helper_1.checkNumber(data.TemplateId, false, field + ".TemplateId");
        ihj_helper_1.checkNumber(data.QueryId, false, field + ".QueryId");
        ihj_helper_1.checkString(data.ContentTypeName, false, field + ".ContentTypeName");
        ihj_helper_1.checkString(data.AppUrl, false, field + ".AppUrl");
        ihj_helper_1.checkNumber(data.AppSettingsId, true, field + ".AppSettingsId");
        ihj_helper_1.checkNumber(data.AppResourcesId, true, field + ".AppResourcesId");
        ihj_helper_1.checkBoolean(data.IsContent, false, field + ".IsContent");
        ihj_helper_1.checkBoolean(data.HasContent, false, field + ".HasContent");
        ihj_helper_1.checkBoolean(data.SupportsAjax, false, field + ".SupportsAjax");
        ihj_helper_1.checkNumber(data.ZoneId, false, field + ".ZoneId");
        ihj_helper_1.checkNumber(data.AppId, false, field + ".AppId");
        ihj_helper_1.checkString(data.Guid, false, field + ".Guid");
        ihj_helper_1.checkNumber(data.Id, false, field + ".Id");
        return new content_group_1.ContentGroup(data);
    };
    return ContentGroupProxy;
}());
exports.ContentGroupProxy = ContentGroupProxy;
//# sourceMappingURL=content-group-proxy.js.map