import express from 'express';
import fpString from 'lodash/fp/string';
import exphbs from 'express-handlebars';
import compression from 'compression';
import nocache from 'nocache';
import path from 'path';
import cookieParser from 'cookie-parser';
import config from './config';

export default function base(app) {
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(nocache());
  app.use(compression());
  // app.disable('view cache');
  // http://evanhahn.com/express-dot-static-deep-dive/
  app.use('/static', express.static('static', {
    // etag: false,
    // maxage: '2h'
  }));
  app.use('/', express.static('static', {
    // etag: false,
    // maxage: '2h'
  }));

// View engine setup
// Use `.hbs` for extensions and find partials in `views/partials`.
  app.engine('hbs', exphbs({
    partialsDir: path.resolve(config.app.root, './views/partials'),
    helpers: {
      ...fpString
    },
    extname: '.hbs'
  }));
  app.set('view engine', 'hbs');
  app.set('views', path.resolve(config.app.root, './views'));
}
