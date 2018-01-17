"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
/**
 * create ContentBlock object from JSON
 */
var ContentBlockCreate = /** @class */ (function () {
    function ContentBlockCreate() {
    }
    // ReSharper disable once InconsistentNaming
    ContentBlockCreate.Parse = function (data) {
        return ContentBlockCreate.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    ContentBlockCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.ShowTemplatePicker, false, field + '.ShowTemplatePicker');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.IsEntity, false, field + '.IsEntity');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.VersioningRequirements, false, field + '.VersioningRequirements');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.Id, false, field + '.Id');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.ParentFieldName, true, field + '.ParentFieldName');
        if (data.ParentFieldName === undefined) {
            data.ParentFieldName = null;
        }
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.ParentFieldSortOrder, false, field + '.ParentFieldSortOrder');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.PartOfPage, false, field + '.PartOfPage');
        // transfer JSON data to new object
        var contenctBlock = {
            ShowTemplatePicker: data.ShowTemplatePicker,
            IsEntity: data.IsEntity,
            VersioningRequirements: data.VersioningRequirements,
            Id: data.Id,
            ParentFieldName: data.ParentFieldName,
            ParentFieldSortOrder: data.ParentFieldSortOrder,
            PartOfPage: data.PartOfPage,
        };
        return contenctBlock;
    };
    return ContentBlockCreate;
}());
exports.ContentBlockCreate = ContentBlockCreate;
//# sourceMappingURL=content-block-create.js.map