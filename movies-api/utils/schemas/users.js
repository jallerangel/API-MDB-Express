const joi = require('joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = joi.object({
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(80).required(),
  isAdmin: joi.boolean(),
});

module.exports = { userIdSchema, createUserSchema };
