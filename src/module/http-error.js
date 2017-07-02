import http from 'http';

export default function HttpError(status, message) {
  if (!(this instanceof HttpError)) {
    return new HttpError(status, message);
  }
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);
  this.status = status;
  this.message = message || http.STATUS_CODES[status] || 'Error';
}

HttpError.prototype = Object.create(Error.prototype);
HttpError.prototype.constructor = HttpError;
HttpError.prototype.name = 'HttpError';
