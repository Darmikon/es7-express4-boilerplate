import fp from 'lodash/fp';
import logger from '../module/logger';

const _ = fp.runInContext();

_.mixin({
  log: _.curry((title, input) => {
    return input;
  }),
  ifElse,
});

export default _;

function ifElse(conditional, success, error) {
  return (input => (conditional(input) ? success(input) : error(input)));
}
