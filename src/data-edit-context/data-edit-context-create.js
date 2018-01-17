"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
var environment_create_1 = require("./environment-create");
var user_create_1 = require("./user-create");
var language_create_1 = require("./language-create");
var content_block_create_1 = require("./content-block-create");
var content_group_create_1 = require("./content-group-create");
var error_create_1 = require("./error-create");
/**
 * create DataEditContext object from JSON
 *
 */
var DataEditContextCreate = /** @class */ (function () {
    function DataEditContextCreate() {
    }
    DataEditContextCreate.parse = function (data) {
        return this.create(JSON.parse(data));
    };
    DataEditContextCreate.create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        // create sub objects from JSON data
        data.Environment = environment_create_1.EnvironmentCreate.create(data.Environment, field + '.Environment');
        data.User = user_create_1.UserCreate.create(data.User, field + '.User');
        data.Language = language_create_1.LanguageCreate.create(data.Language, field + '.Language');
        data.ContentBlock = content_block_create_1.ContentBlockCreate.Create(data.ContentBlock, field + '.ContentBlock');
        data.ContentGroup = content_group_create_1.ContentGroupCreate.create(data.ContentGroup, field + '.ContentGroup');
        data.error = error_create_1.ErrorCreate.create(data.error, field + '.error');
        // transfer JSON data to new object
        var dataEditContext = {
            Environment: data.Environment,
            User: data.User,
            Language: data.Language,
            ContentBlock: data.ContentBlock,
            ContentGroup: data.ContentGroup,
            error: data.error
        };
        return dataEditContext;
    };
    return DataEditContextCreate;
}());
exports.DataEditContextCreate = DataEditContextCreate;
//# sourceMappingURL=data-edit-context-create.js.map