import cors from 'cors';
import Router from '../module/api-router';
import api from './api';

const routes = Router();

routes.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

routes.use('/api', cors(), api);

export default routes;
