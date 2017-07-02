import Boom from 'boom';
import HttpError from '../module/http-error';
import logger from '../module/logger';

export default function (err, req, res, next) {
  if (!(err instanceof Error || err instanceof HttpError)) {
    err = new Error(err);
  }
  const errorStatus = err.status || 500;
  let { headers, payload } = Boom.wrap(err, errorStatus).output;
  res.status(errorStatus);
  if (errorStatus >= 500) {
    logger.error(err);
  }
  payload.message = err.message || payload.message;
  res.set(headers);
  res.json(payload);
}
