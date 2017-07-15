import { Router } from 'express';
import _ from '../utils/fp';

/**
 * @description
 * This module wraps all callback into async/await wrappers and it will allow not to carry out about
 * throw errors directly from apiRouter methods
 * @example
 * // --- Before --- //
 * routes.get('/login', async (req, res, next) => {
 *   try {
 *    const result = await pool.many(sql`
 *      SELECT * FROM table1.users
 *    `);
 *    res.send(result);
 *   } catch (e) {
 *     return next(e);
 *   }
 * });
 * routes.get('/login', async (req, res) => {
 *   const result = await pool.many(sql`
 *    SELECT * FROM table1.users
 *  `);
 *  res.send(result);
 * });
* */
//async wrapper
const asyncWrap = (fn) => {
  return (...args) => {
    const resPromise = fn(...args);
    //leave support for old middleware without async/await syntax
    if (resPromise && resPromise.catch) {
      return resPromise.catch(args[2]);
    }
    return resPromise;
  };
}; //.catch(next)
const wrapper = _.compose(
  _.map(_.ifElse(
    _.isFunction,
    asyncWrap,
    _.identity
  )),
  _.flatten,
);
const decorator = (router, method) => {
  const oldMethod = router[method];
  return (url, ...middlewares) => {
    if (_.isFunction(url)) {
      url = wrapper(url);
    }
    middlewares = middlewares || [];
    return oldMethod.call(router, url, ...wrapper(middlewares));
  };
};

/*
* @description
* I only decorate methods which I'm going to use in async/await style in the application
* */
export default function ApiRouter(...rest) {
  const router = Router(...rest);
  /*
  *  console.log(_.keys(router.__proto__));
  * [
  *   'acl', 'all'
  *   'bind',
  *   'checkout', 'connect', 'copy',
  *   'delete' ,
  *   'get',
  *   'head', 'handle',
  *   'link', 'lock',
  *   'm-search', 'merge', 'mkactivity', 'mkcalendar', 'mkcol', 'move',
  *   'notify',
  *   'options',
  *   'patch', 'post', 'param', 'propfind', 'proppatch', 'purge', 'put', 'process_params',
  *   'rebind', 'report', 'route',
  *   'search', 'subscribe','trace',
  *   'use', 'unbind', 'unlink', 'unlock', 'unsubscribe',
  * ]
  * */
  router.get = decorator(router, 'get');
  router.post = decorator(router, 'post');
  router.put = decorator(router, 'put');
  router.delete = decorator(router, 'delete');
  return router;
}
