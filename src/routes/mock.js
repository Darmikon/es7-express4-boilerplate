import { Router } from 'express';
import bodyParser from 'body-parser';
import HttpError from '../module/http-error';

const routes = Router({ mergeParams: true });

routes.get('/mock1', (req, res, next) => {
  // res.send(403); //write to response this text only
  return next(HttpError(403, 'custom'));

  // res.render('index', { title: 'Express Babel' });
});

routes.get('/mock2', async (req, res, next) => {
  try {
    await Promise.reject('error mock2');
    // throw new Error('bbbb');
  } catch (e) {
    // return next(HttpError(e));
    return next(e);
  }
});

let wrap = fn => (...args) => fn(...args).catch(args[2]); //.catch(next)
routes.get('/mock3', wrap(async (req, res, next) => {
  await Promise.reject('error mock3');
  // throw new Error('bbbb');
}));

routes.post('/mock3', bodyParser.json(), (req, res, next) => {
  if (!req.is('json')) {
    return next(HttpError(400));
  }
  // console.log(req.query);
  res.send(req.body);
});

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
routes.post('/login', (req, res) => {
  res.json(req.body);
});

export default routes;
