import HttpError from '../module/http-error';

export default (req, res, next) => next(HttpError(404));
