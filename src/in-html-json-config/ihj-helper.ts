export function checkData(data: any, field: string): void {
  if (data === null || data === undefined) {
    throwNull2NonNull(field, data);
  } else if (typeof (data) !== 'object') {
    throwNotObject(field, data, false);
  } else if (Array.isArray(data)) {
    throwIsArray(field, data, false);
  }
}

export function checkArray(data: any, field: string): void {
  if (!Array.isArray(data) && data !== null && data !== undefined) {
    errorHelper(field, data, "array", true);
  }
}

export function checkNumber(data: any, nullable: boolean, field: string): void {
  if (typeof (data) !== 'number' && (!nullable || (nullable && data !== null && data !== undefined))) {
    errorHelper(field, data, "number", nullable);
  }
}

export function checkBoolean(data: any, nullable: boolean, field: string): void {
  if (typeof (data) !== 'boolean' && (!nullable || (nullable && data !== null && data !== undefined))) {
    errorHelper(field, data, "boolean", nullable);
  }
}

export function checkString(data: any, nullable: boolean, field: string): void {
  if (typeof (data) !== 'string' && (!nullable || (nullable && data !== null && data !== undefined))) {
    errorHelper(field, data, "string", nullable);
  }
}

export function checkNull(data: any, field: string): void {
  if (data !== null && data !== undefined) {
    errorHelper(field, data, "null or undefined", false);
  }
}

export function throwNull2NonNull(field: string, data: any): never {
  return errorHelper(field, data, "non-nullable object", false);
}

export function throwNotObject(field: string, data: any, nullable: boolean): never {
  return errorHelper(field, data, "object", nullable);
}

export function throwIsArray(field: string, data: any, nullable: boolean): never {
  return errorHelper(field, data, "object", nullable);
}

function errorHelper(field: string, data: any, type: string, nullable: boolean): never {
  if (nullable) {
    type += ", null, or undefined";
  }
  throw new TypeError('Expected ' + type + " at " + field + " but found:\n" + JSON.stringify(data));
}
