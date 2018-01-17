"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
/**
 * create ContentGroup object from JSON
 */
var ContentGroupCreate = /** @class */ (function () {
    function ContentGroupCreate() {
    }
    ContentGroupCreate.parse = function (data) {
        return this.create(JSON.parse(data));
    };
    ContentGroupCreate.create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.IsCreated, false, field + '.IsCreated');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.IsList, false, field + '.IsList');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.TemplateId, false, field + '.TemplateId');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.QueryId, true, field + '.QueryId');
        json_validation_helper_1.JsonValidationHelper.checkString(data.ContentTypeName, false, field + '.ContentTypeName');
        json_validation_helper_1.JsonValidationHelper.checkString(data.AppUrl, false, field + '.AppUrl');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.AppSettingsId, true, field + '.AppSettingsId');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.AppResourcesId, true, field + '.AppResourcesId');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.IsContent, false, field + '.IsContent');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.HasContent, false, field + '.HasContent');
        json_validation_helper_1.JsonValidationHelper.checkBoolean(data.SupportsAjax, false, field + '.SupportsAjax');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.ZoneId, false, field + '.ZoneId');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.AppId, false, field + '.AppId');
        json_validation_helper_1.JsonValidationHelper.checkString(data.Guid, false, field + '.Guid');
        json_validation_helper_1.JsonValidationHelper.checkNumber(data.Id, false, field + '.Id');
        // transfer JSON data to new object
        var contentGroup = {
            IsCreated: data.IsCreated,
            IsList: data.IsList,
            TemplateId: data.TemplateId,
            QueryId: data.QueryId,
            ContentTypeName: data.ContentTypeName,
            AppUrl: data.AppUrl,
            AppSettingsId: data.AppSettingsId,
            AppResourcesId: data.AppResourcesId,
            IsContent: data.IsContent,
            HasContent: data.HasContent,
            SupportsAjax: data.SupportsAjax,
            ZoneId: data.ZoneId,
            AppId: data.AppId,
            Guid: data.Guid,
            Id: data.Id
        };
        return contentGroup;
    };
    return ContentGroupCreate;
}());
exports.ContentGroupCreate = ContentGroupCreate;
//# sourceMappingURL=content-group-create.js.map