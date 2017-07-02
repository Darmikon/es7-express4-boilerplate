import { Router } from 'express';
import cors from 'cors';
import api from './api';

const routes = Router();

routes.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

routes.use('/api', cors(), api);

export default routes;
