// https://github.com/brianc/node-postgres
// https://github.com/brianc/node-postgres/wiki/Example
// 3rd
import { extend, parseUrl } from 'pg-extra';
import pg from 'pg';
import config from '../../config/config';
import logger from '../logger';

const pgExtra = extend(pg);
// =========================================================

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pgExtra.Pool(config);
// This is the connection pool the rest of our db namespace
// should import and use
// const url = 'postgres://user:pass@localhost:5432/my-db'
//const pool = new pg.Pool(parseUrl(url))

pool.on('error', (error, client) => {
  // handle this in the same way you would treat process.on('uncaughtException')
  // it is supplied the error as well as the idle client which received the error
  console.info('error');
  logger.error(error);
});

pool.on('connect', (client) => {
  console.log('connect');
});

export default pool;
