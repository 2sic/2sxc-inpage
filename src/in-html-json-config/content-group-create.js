"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
/**
 * create ContentGroup object from JSON
 */
var ContentGroupCreate = /** @class */ (function () {
    function ContentGroupCreate() {
    }
    // ReSharper disable once InconsistentNaming
    ContentGroupCreate.Parse = function (data) {
        return ContentGroupCreate.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    ContentGroupCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.IsCreated, false, field + '.IsCreated');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.IsList, false, field + '.IsList');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.TemplateId, false, field + '.TemplateId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.QueryId, true, field + '.QueryId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.ContentTypeName, false, field + '.ContentTypeName');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.AppUrl, false, field + '.AppUrl');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.AppSettingsId, true, field + '.AppSettingsId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.AppResourcesId, true, field + '.AppResourcesId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.IsContent, false, field + '.IsContent');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.HasContent, false, field + '.HasContent');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkBoolean(data.SupportsAjax, false, field + '.SupportsAjax');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.ZoneId, false, field + '.ZoneId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.AppId, false, field + '.AppId');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.Guid, false, field + '.Guid');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNumber(data.Id, false, field + '.Id');
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