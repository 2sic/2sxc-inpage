"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ihj_config_validation_helper_1 = require("./ihj-config-validation-helper");
/**
 * create Language object from JSON
 */
var LanguageCreate = /** @class */ (function () {
    function LanguageCreate() {
    }
    // ReSharper disable once InconsistentNaming
    LanguageCreate.Parse = function (data) {
        return LanguageCreate.Create(JSON.parse(data));
    };
    // ReSharper disable once InconsistentNaming
    LanguageCreate.Create = function (data, field) {
        if (field === void 0) { field = 'root'; }
        if (!field) {
            field = 'root';
        }
        // validate JSON data
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkData(data, field);
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.Current, false, field + '.Current');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkString(data.Primary, false, field + '.Primary');
        ihj_config_validation_helper_1.IhjConfigValidationHelper.checkArray(data.All, field + '.All');
        if (data.All) {
            for (var i = 0; i < data.All.length; i++) {
                ihj_config_validation_helper_1.IhjConfigValidationHelper.checkNull(data.All[i], field + '.All' + '[' + i + ']');
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