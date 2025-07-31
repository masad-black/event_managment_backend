class Error {
  constructor(
    statusCode = 500,
    message = "Internal server error",
    type = "INTERNAL_SERVER_ERROR"
  ) {
    this.error = {
      code: statusCode,
      message,
      type,
    };
  }
}

module.exports = Error;
