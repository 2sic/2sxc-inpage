"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_validation_helper_1 = require("./json-validation-helper");
/**
 * create Language object from JSON
 */
var LanguageCreate = /** @class */ (function () {
    function LanguageCreate() {
    }
    LanguageCreate.parse = function (data) {
        return this.create(JSON.parse(data));
    };
    LanguageCreate.create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        json_validation_helper_1.JsonValidationHelper.checkData(data, field);
        json_validation_helper_1.JsonValidationHelper.checkString(data.Current, false, field + '.Current');
        json_validation_helper_1.JsonValidationHelper.checkString(data.Primary, false, field + '.Primary');
        json_validation_helper_1.JsonValidationHelper.checkArray(data.All, field + '.All');
        if (data.All) {
            for (var i = 0; i < data.All.length; i++) {
                json_validation_helper_1.JsonValidationHelper.checkNull(data.All[i], field + '.All' + '[' + i + ']');
                if (data.All[i] === undefined) {
                    data.All[i] = null;
                }
            }
        }
        if (data.All === undefined) {
            data.All = null;
        }
        // transfer JSON data to new object
        var language = {
            Current: data.Current,
            Primary: data.Primary,
            All: data.All
        };
        return language;
    };
    return LanguageCreate;
}());
exports.LanguageCreate = LanguageCreate;
//# sourceMappingURL=language-create.js.map