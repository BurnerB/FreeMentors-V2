class Responses {
  static authsuccess(statusCode, message, data, res) {
    res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
  }

  static success(statusCode, message, res) {
    res.status(statusCode).json({
      status: statusCode,
      data: message,
    });
  }

  static handleError(statusCode, message, res) {
    res.status(statusCode).json({
      status: statusCode,
      error: message,
    });
  }

  static catchError(statusCode, data, res) {
    res.status(statusCode).json({
      status: statusCode,
      error: data,
    });
  }
}

export default Responses;
