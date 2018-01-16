"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_helper_1 = require("./ihj-helper");
var content_block_1 = require("./content-block");
/**
 * proxy create ContentBlock object from JSON
 */
var ContentBlockProxy = /** @class */ (function () {
    function ContentBlockProxy() {
    }
    ContentBlockProxy.Parse = function (data) {
        return ContentBlockProxy.Create(JSON.parse(data));
    };
    ContentBlockProxy.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = "root";
        }
        ihj_helper_1.checkData(data, field);
        ihj_helper_1.checkBoolean(data.ShowTemplatePicker, false, field + ".ShowTemplatePicker");
        ihj_helper_1.checkBoolean(data.IsEntity, false, field + ".IsEntity");
        ihj_helper_1.checkString(data.VersioningRequirements, false, field + ".VersioningRequirements");
        ihj_helper_1.checkNumber(data.Id, false, field + ".Id");
        ihj_helper_1.checkString(data.ParentFieldName, true, field + ".ParentFieldName");
        if (data.ParentFieldName === undefined) {
            data.ParentFieldName = null;
        }
        ihj_helper_1.checkNumber(data.ParentFieldSortOrder, false, field + ".ParentFieldSortOrder");
        ihj_helper_1.checkBoolean(data.PartOfPage, false, field + ".PartOfPage");
        return new content_block_1.ContentBlock(data);
    };
    return ContentBlockProxy;
}());
exports.ContentBlockProxy = ContentBlockProxy;
//# sourceMappingURL=content-block-proxy.js.map