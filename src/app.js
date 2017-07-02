import express from 'express';
import config from './config/config';
import base from './config/base';
import routes from './routes';
import logger from './module/logger';
import middleware from './middleware';
import errorHandlers from './module/error-handlers';

const app = express();

base(app);
app.use(...middleware);
app.use(routes);
errorHandlers(app);

const server = app.listen(
  config.app.port,
  () => logger.info(`app is working on http://localhost:${server.address().port}`)
);
