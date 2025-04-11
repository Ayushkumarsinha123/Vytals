class AppError extends Error {
  constructor(message, statusCode) {
    // to call the parent constructor with message as it's only parameter that
    // built-in error accepts. This is just like calling error : new Error('message')
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
