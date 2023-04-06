const boom = require('@hapi/boom');

const validate = (data, schema) => {
  const { error } = schema.validate({ data });
  return error;
};

function validationHandler(schema, property) {
  return (req, res, next) => {
    const { error } = validate(req[property], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validationHandler;
