const { StatusCodes, ReasonPhrases } = require('http-status-codes');

class HttpError extends Error {
  constructor(code, why, status) {
    super(why);
    this.message = why;
    this.status = code;
    this.error = status;
  }

  static methodNotAllowed(why) {
    return new HttpError(String(StatusCodes.METHOD_NOT_ALLOWED), why, ReasonPhrases.METHOD_NOT_ALLOWED);
  }

  static badRequest(why) {
    return new HttpError(String(StatusCodes.BAD_REQUEST), why, ReasonPhrases.BAD_REQUEST);
  }

  static notFound(why) {
    return new HttpError(String(StatusCodes.NOT_FOUND), why, 'The specified resource was not found.');
  }
}

module.exports = HttpError;
