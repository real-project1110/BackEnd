class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.name = 'InvalidParamsError';
    if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
  }
}

class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
    this.name = 'ValidationError';
  }
}

module.exports = { InvalidParamsError, ValidationError };

