"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
/**
 * create ContentBlock object from JSON
 */
var ContentBlockCreate = /** @class */ (function () {
    function ContentBlockCreate() {
    }
    // ReSharper disable once InconsistentNaming
    ContentBlockCreate.Parse = function (data) {
        return this.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    ContentBlockCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.ShowTemplatePicker, false, field + '.ShowTemplatePicker');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.IsEntity, false, field + '.IsEntity');
        json_validation_helper_1.JsonValidationHelper.checkString(data.VersioningRequirements, false, field + '.VersioningRequirements');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.Id, false, field + '.Id');
        json_validation_helper_1.JsonValidationHelper.checkString(data.ParentFieldName, true, field + '.ParentFieldName');
        if (data.ParentFieldName === undefined) {
            data.ParentFieldName = null;
        }
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.ParentFieldSortOrder, false, field + '.ParentFieldSortOrder');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.PartOfPage, false, field + '.PartOfPage');
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