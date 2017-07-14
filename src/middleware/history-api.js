/*
 * I will also monitor X-Requested-With:XMLHttpRequest header in addition to general workflow
 * ignoredEndpoings: ['/api'] option was added
 * */

import url from 'url';

export default function historyApiFallback(options) {
  options = options || {};
  let logger = getLogger(options);

  return function (req, res, next) {
    let headers = req.headers;
    if (req.method !== 'GET') {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the method is not GET.'
      );
      return next();
    } else if (!headers || typeof headers.accept !== 'string') {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client did not send an HTTP accept header.'
      );
      return next();
    } else if (headers.accept.indexOf('application/json') === 0) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client prefers JSON.'
      );
      return next();
    } else if (!acceptsHtml(headers.accept, options)) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the client does not accept HTML.'
      );
      return next();
    } else if (
      headers['X-Requested-With'] === 'XMLHttpRequest' ||
      headers['x-requested-with'] === 'XMLHttpRequest'
    ) {
      return next();
    }

    let parsedUrl = url.parse(req.url);
    let rewriteTarget;
    options.rewrites = options.rewrites || [];
    for (let i = 0; i < options.rewrites.length; i++) {
      let rewrite = options.rewrites[i];
      let match = parsedUrl.pathname.match(rewrite.from);
      if (match !== null) {
        rewriteTarget = evaluateRewriteRule(parsedUrl, match, rewrite.to);
        logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
        req.url = rewriteTarget;
        return next();
      }
    }

    if (parsedUrl.pathname.indexOf('.') !== -1 &&
      options.disableDotRule !== true) {
      logger(
        'Not rewriting',
        req.method,
        req.url,
        'because the path includes a dot (.) character.'
      );
      return next();
    }

    if (Array.isArray(options.ignoredEndpoints)) {
      const match = options.ignoredEndpoints.some((str) => {
        if (parsedUrl.pathname.indexOf(str) !== -1) {
          logger(
            'Not rewriting',
            method,
            reqUrl,
            'because it is ingored request.'
          );
          return true;
        }
      });

      if (match) {
        return next();
      }
    }

    rewriteTarget = options.index || '/index.html';
    logger('Rewriting', req.method, req.url, 'to', rewriteTarget);
    req.url = rewriteTarget;
    next();
  };
}

function evaluateRewriteRule(parsedUrl, match, rule) {
  if (typeof rule === 'string') {
    return rule;
  } else if (typeof rule !== 'function') {
    throw new Error('Rewrite rule can only be of type string of function.');
  }

  return rule({
    parsedUrl,
    match
  });
}

function acceptsHtml(header, options) {
  options.htmlAcceptHeaders = options.htmlAcceptHeaders || ['text/html', '*/*'];
  for (let i = 0; i < options.htmlAcceptHeaders.length; i++) {
    if (header.indexOf(options.htmlAcceptHeaders[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function getLogger(options) {
  if (options && options.logger) {
    return options.logger;
  } else if (options && options.verbose) {
    return console.log.bind(console);
  }
  return function () {};
}
