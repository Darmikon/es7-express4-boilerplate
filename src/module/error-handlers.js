import errors from '../middleware/errors';
import error404 from '../middleware/error-404';
import logger from '../module/logger';

export default function (app) {
  app.use(error404);
  app.use(errors);

  process.on('uncaughtException', (err) => {
    logger.debug('†...†...†');
    logger.error(err);
  });
  process.on('unhandledRejection', (reason) => {
    logger.debug('Unhandled rejection');
    logger.error(reason);
  });
}
