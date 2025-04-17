export class CustomException extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string, statusCode: number, success: boolean) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.success = success;

    Object.setPrototypeOf(this, CustomException.prototype);
  }
}
