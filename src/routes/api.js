import { Router } from 'express';
import Http from '../module/http-error';
import mock from './mock';
//†import

const routes = Router();

routes.get('/', (req, res, next) => next(Http(405)));

routes.use('/mock', mock);
//†route

export default routes;
