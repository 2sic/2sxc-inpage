/**
 * Helper methods to validate JSON data
 */
export class JsonValidationHelper {

  public static checkData(data: any, field: string): void {
    if (data === null || data === undefined) {
      this.throwNull2NonNull(field, data);
    } else if (typeof (data) !== 'object') {
      this.throwNotObject(field, data, false);
    } else if (Array.isArray(data)) {
      this.throwIsArray(field, data, false);
    }
  }

  public static checkArray(data: any, field: string): void {
    if (!Array.isArray(data) && data !== null && data !== undefined) {
      this.errorHelper(field, data, 'array', true);
    }
  }

  public static checkNumber(data: any, nullable: boolean, field: string): void {
    if (typeof (data) !== 'number' && (!nullable || (nullable && data !== null && data !== undefined))) {
      this.errorHelper(field, data, 'number', nullable);
    }
  }

  public static checkBoolean(data: any, nullable: boolean, field: string): void {
    if (typeof (data) !== 'boolean' && (!nullable || (nullable && data !== null && data !== undefined))) {
      this.errorHelper(field, data, 'boolean', nullable);
    }
  }

  public static checkString(data: any, nullable: boolean, field: string): void {
    if (typeof (data) !== 'string' && (!nullable || (nullable && data !== null && data !== undefined))) {
      this.errorHelper(field, data, 'string', nullable);
    }
  }

  public static checkNull(data: any, field: string): void {
    if (data !== null && data !== undefined) {
      this.errorHelper(field, data, 'null or undefined', false);
    }
  }

  public static throwNull2NonNull(field: string, data: any): never {
    return this.errorHelper(field, data, 'non-nullable object', false);
  }

  private static throwNotObject(field: string, data: any, nullable: boolean): never {
    return this.errorHelper(field, data, 'object', nullable);
  }

  private static throwIsArray(field: string, data: any, nullable: boolean): never {
    return this.errorHelper(field, data, 'object', nullable);
  }

  private static errorHelper(field: string, data: any, type: string, nullable: boolean): never {
    if (nullable) {
      type += ', null, or undefined';
    }
    throw new TypeError(`Expected ${type} at ${field} but found:\n${JSON.stringify(data)}`);
  }
}
