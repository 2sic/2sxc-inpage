"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Helper methods to validate JSON data
 */
var JsonValidationHelper = /** @class */ (function () {
    function JsonValidationHelper() {
    }
    JsonValidationHelper.checkData = function (data, field) {
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
    JsonValidationHelper.checkArray = function (data, field) {
        if (!Array.isArray(data) && data !== null && data !== undefined) {
            this.errorHelper(field, data, 'array', true);
        }
    };
    JsonValidationHelper.checkNumber = function (data, nullable, field) {
        if (typeof (data) !== 'number' && (!nullable || (nullable && data !== null && data !== undefined))) {
            this.errorHelper(field, data, 'number', nullable);
        }
    };
    JsonValidationHelper.checkBoolean = function (data, nullable, field) {
        if (typeof (data) !== 'boolean' && (!nullable || (nullable && data !== null && data !== undefined))) {
            this.errorHelper(field, data, 'boolean', nullable);
        }
    };
    JsonValidationHelper.checkString = function (data, nullable, field) {
        if (typeof (data) !== 'string' && (!nullable || (nullable && data !== null && data !== undefined))) {
            this.errorHelper(field, data, 'string', nullable);
        }
    };
    JsonValidationHelper.checkNull = function (data, field) {
        if (data !== null && data !== undefined) {
            this.errorHelper(field, data, 'null or undefined', false);
        }
    };
    JsonValidationHelper.throwNull2NonNull = function (field, data) {
        return this.errorHelper(field, data, 'non-nullable object', false);
    };
    JsonValidationHelper.throwNotObject = function (field, data, nullable) {
        return this.errorHelper(field, data, 'object', nullable);
    };
    JsonValidationHelper.throwIsArray = function (field, data, nullable) {
        return this.errorHelper(field, data, 'object', nullable);
    };
    JsonValidationHelper.errorHelper = function (field, data, type, nullable) {
        if (nullable) {
            type += ', null, or undefined';
        }
        throw new TypeError("Expected " + type + " at " + field + " but found:\n" + JSON.stringify(data));
    };
    return JsonValidationHelper;
}());
exports.JsonValidationHelper = JsonValidationHelper;
//# sourceMappingURL=json-validation-helper.js.map