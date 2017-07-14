import expressLogging from 'express-logging';
import config from '../config/config';
import history from './history-api';
import identity from './identity';
import logger from '../module/logger';
//†import

/*
* for advanced cased probably these modules can be used
* https://github.com/blakeembrey/compose-middleware
* https://github.com/tjmehta/middleware-flow
*/
export default [
  expressLogging(logger),
  config.app.html5HistoryAPI
    ? history({ index: '/', ignoredEndpoints: ['/api'] })
    : identity
];
