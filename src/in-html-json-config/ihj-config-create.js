"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
var environment_create_1 = require("./environment-create");
var user_create_1 = require("./user-create");
var language_create_1 = require("./language-create");
var content_block_create_1 = require("./content-block-create");
var content_group_create_1 = require("./content-group-create");
var error_create_1 = require("./error-create");
/**
 * create IhjConfig object from JSON
 *
 */
var IhjConfigCreate = /** @class */ (function () {
    function IhjConfigCreate() {
    }
    // ReSharper disable once InconsistentNaming
    IhjConfigCreate.Parse = function (data) {
        return IhjConfigCreate.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    IhjConfigCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        // create sub objects from JSON data
        data.Environment = environment_create_1.EnvironmentCreate.Create(data.Environment, field + '.Environment');
        data.User = user_create_1.UserCreate.Create(data.User, field + '.User');
        data.Language = language_create_1.LanguageCreate.Create(data.Language, field + '.Language');
        data.ContentBlock = content_block_create_1.ContentBlockCreate.Create(data.ContentBlock, field + '.ContentBlock');
        data.ContentGroup = content_group_create_1.ContentGroupCreate.Create(data.ContentGroup, field + '.ContentGroup');
        data.error = error_create_1.ErrorCreate.Create(data.error, field + '.error');
        // transfer JSON data to new object
        var ihjConfig = {
            Environment: data.Environment,
            User: data.User,
            Language: data.Language,
            ContentBlock: data.ContentBlock,
            ContentGroup: data.ContentGroup,
            error: data.error
        };
        return ihjConfig;
    };
    return IhjConfigCreate;
}());
exports.IhjConfigCreate = IhjConfigCreate;
//# sourceMappingURL=ihj-config-create.js.map