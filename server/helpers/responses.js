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

  static Error(statusCode, message, res) {
    res.status(statusCode).json({
      status: statusCode,
      error: message,
    });
  }
}

export default Responses;
