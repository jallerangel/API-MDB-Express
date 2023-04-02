const { config } = require('../../config');

function withErrorStack(err, stack) {
  if (config.dev) {
    return err, stack;
  }
  return err;
}

function logErrors(err, req, res, next) {
  console.log(err);
  next();
}

function errorHandler(err, req, res, next) { // eslint-disable-line
  res.status(err.status || 500);
  res.json(withErrorStack(err.message, err.stack));
}

module.exports = { withErrorStack, logErrors, errorHandler };
