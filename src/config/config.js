import path from 'path';
import _ from '../utils/fp';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const DEFAULT_PORT = 7000;
/**
 * @property {bool}  html5HistoryAPI   - Redirect all request accept ajax and static files to '/' index route
 */
let base = {
  app: {
    env,
    root: path.resolve(__dirname, '../'),
    html5HistoryAPI: true,
  }
};


let specific = {
  development: {
    app: {
      port: DEFAULT_PORT,
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'test'
    }
  },
  production: {
    app: {
      port: process.env.PORT || DEFAULT_PORT,
    },
    mysql: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'test'
    }
  },
};

export default _.merge(specific[env])(base);
