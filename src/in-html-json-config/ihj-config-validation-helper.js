"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper methods to validate JSON data
 */
var IhjConfigValidationHelper = /** @class */ (function () {
    function IhjConfigValidationHelper() {
    }
    IhjConfigValidationHelper.checkData = function (data, field) {
        if (data === null || data === undefined) {
            this.throwNull2NonNull(field, data);
        }
        else if (typeof (data) !== 'object') {
            this.throwNotObject(field, data, false);
        }
        else if (Array.isArray(data)) {
            this.throwIsArray(field, data, false);
        }
    };
    IhjConfigValidationHelper.checkArray = function (data, field) {
        if (!Array.isArray(data) && data !== null && data !== undefined) {
            this.errorHelper(field, data, 'array', true);
        }
    };
    IhjConfigValidationHelper.checkNumber = function (data, nullable, field) {
        if (typeof (data) !== 'number' && (!nullable || (nullable && data !== null && data !== undefined))) {
            this.errorHelper(field, data, 'number', nullable);
        }
    };
    IhjConfigValidationHelper.checkBoolean = function (data, nullable, field) {
        if (typeof (data) !== 'boolean' && (!nullable || (nullable && data !== null && data !== undefined))) {
            this.errorHelper(field, data, 'boolean', nullable);
        }
    };
    IhjConfigValidationHelper.checkString = function (data, nullable, field) {
        if (typeof (data) !== 'string' && (!nullable || (nullable && data !== null && data !== undefined))) {
            this.errorHelper(field, data, 'string', nullable);
        }
    };
    IhjConfigValidationHelper.checkNull = function (data, field) {
        if (data !== null && data !== undefined) {
            this.errorHelper(field, data, 'null or undefined', false);
        }
    };
    IhjConfigValidationHelper.throwNull2NonNull = function (field, data) {
        return this.errorHelper(field, data, 'non-nullable object', false);
    };
    IhjConfigValidationHelper.throwNotObject = function (field, data, nullable) {
        return this.errorHelper(field, data, 'object', nullable);
    };
    IhjConfigValidationHelper.throwIsArray = function (field, data, nullable) {
        return this.errorHelper(field, data, 'object', nullable);
    };
    IhjConfigValidationHelper.errorHelper = function (field, data, type, nullable) {
        if (nullable) {
            type += ', null, or undefined';
        }
        throw new TypeError("Expected " + type + " at " + field + " but found:\n" + JSON.stringify(data));
    };
    return IhjConfigValidationHelper;
}());
exports.IhjConfigValidationHelper = IhjConfigValidationHelper;
//# sourceMappingURL=ihj-config-validation-helper.js.map