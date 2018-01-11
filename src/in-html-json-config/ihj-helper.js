"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkData(data, field) {
    if (data === null || data === undefined) {
        throwNull2NonNull(field, data);
    }
    else if (typeof (data) !== 'object') {
        throwNotObject(field, data, false);
    }
    else if (Array.isArray(data)) {
        throwIsArray(field, data, false);
    }
}
exports.checkData = checkData;
function checkArray(data, field) {
    if (!Array.isArray(data) && data !== null && data !== undefined) {
        errorHelper(field, data, "array", true);
    }
}
exports.checkArray = checkArray;
function checkNumber(data, nullable, field) {
    if (typeof (data) !== 'number' && (!nullable || (nullable && data !== null && data !== undefined))) {
        errorHelper(field, data, "number", nullable);
    }
}
exports.checkNumber = checkNumber;
function checkBoolean(data, nullable, field) {
    if (typeof (data) !== 'boolean' && (!nullable || (nullable && data !== null && data !== undefined))) {
        errorHelper(field, data, "boolean", nullable);
    }
}
exports.checkBoolean = checkBoolean;
function checkString(data, nullable, field) {
    if (typeof (data) !== 'string' && (!nullable || (nullable && data !== null && data !== undefined))) {
        errorHelper(field, data, "string", nullable);
    }
}
exports.checkString = checkString;
function checkNull(data, field) {
    if (data !== null && data !== undefined) {
        errorHelper(field, data, "null or undefined", false);
    }
}
exports.checkNull = checkNull;
function throwNull2NonNull(field, data) {
    return errorHelper(field, data, "non-nullable object", false);
}
exports.throwNull2NonNull = throwNull2NonNull;
function throwNotObject(field, data, nullable) {
    return errorHelper(field, data, "object", nullable);
}
exports.throwNotObject = throwNotObject;
function throwIsArray(field, data, nullable) {
    return errorHelper(field, data, "object", nullable);
}
exports.throwIsArray = throwIsArray;
function errorHelper(field, data, type, nullable) {
    if (nullable) {
        type += ", null, or undefined";
    }
    throw new TypeError('Expected ' + type + " at " + field + " but found:\n" + JSON.stringify(data));
}
//# sourceMappingURL=ihj-helper.js.map