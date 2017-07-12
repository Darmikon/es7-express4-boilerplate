// https://github.com/brianc/node-postgres
// https://github.com/brianc/node-postgres/wiki/Example
// 3rd
//const {extend, parseUrl} = require('pg-extra')
//const pg = extend(require('pg'))
import pg from 'pg';
// 1st
const config = require('../../config/config');
// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
//var config = {
//    user: 'foo', //env var: PGUSER
//    database: 'my_db', //env var: PGDATABASE
//    password: 'secret', //env var: PGPASSWORD
//    host: 'localhost', // Server hosting the postgres database
//    port: 5432, //env var: PGPORT
//    max: 10, // max number of clients in the pool
//    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
//};

// =========================================================

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
//const pool = new pg.Pool(config);
// This is the connection pool the rest of our db namespace
// should import and use
//const pool = new pg.Pool(parseUrl(config.DATABASE_URL))

//pool.on('error', function(error, client) {
//    // handle this in the same way you would treat process.on('uncaughtException')
//    // it is supplied the error as well as the idle client which received the error
// console.error('idle client error', err.message, err.stack);
//})

//var count = 0
//
//pool.on('connect', client => {
//    client.count = count++
//})

//module.exports = {pool}

////export the query method for passing queries to the pool
//module.exports.query = function (text, values, callback) {
//    console.log('query:', text, values);
//    return pool.query(text, values, callback);
//};
//
//// the pool also supports checking out a client for
//// multiple operations, such as a transaction
//module.exports.connect = function (callback) {
//    return pool.connect(callback);
//};