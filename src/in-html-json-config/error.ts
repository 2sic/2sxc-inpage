import { IError } from "./error-interface";

/**
 * Error class
 */
export class Error implements IError {
  public type: string;

  constructor(data: any) {
    this.type = data.type;
  }
}