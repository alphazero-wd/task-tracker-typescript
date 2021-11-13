interface ErrorResponseInterface {
  message: string;
  statusCode?: number;
  field?: string;
}
export class ErrorResponse extends Error implements ErrorResponseInterface {
  message: string;
  statusCode?: number;
  field?: string;
  constructor(message: string, statusCode?: number, field?: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.field = field;
  }
}
