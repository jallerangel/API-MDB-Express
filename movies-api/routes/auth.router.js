const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysServices = require('../services/apiKeys');
const UsersServices = require('../services/users');
const validationHandler = require('../utils/middlewares/validationHandler');
const { createUserSchema } = require('../utils/schemas/users');
const { config } = require('../config');

// Basic Estrategy
require('../utils/auth/strategies/basic');

async function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);
  const apiKeysService = new ApiKeysServices();
  const usersService = new UsersServices();

  router.post('/sign-in', async (req, res, next) => {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) next(boom.unauthorized('apiKeyToken is required'));

    if (
      apiKeyToken == config.AdminApiKeyToken ||
      apiKeyToken == config.publicApiKeyToken
    ) {
      passport.authenticate('basic', (err, user) => {
        try {
          if (err || !user) return next(boom.unauthorized());

          req.login(user, { session: false }, async (err) => {
            if (err) return next(err);
            const apiKey = await apiKeysService.getApiKey({
              token: apiKeyToken,
            });
            if (!apiKey) next(boom.unauthorized());
            const { _id: id, name, email } = user;

            const payload = {
              sub: id,
              name,
              email,
              scopes: apiKey.scopes,
            };

            const token = jwt.sign(payload, config.authJwtSecret, {
              expiresIn: '15m',
            });
            return res.status(200).json({ token, user: { id, name, email } });
          });
        } catch (e) {
          next(e);
        }
      })(req, res, next);
    } else {
      next(boom.unauthorized('Invalid apiKeyToken'));
    }
  });

  router.post(
    '/sign-up',
    validationHandler(createUserSchema, 'body'),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const createdUserId = await usersService.createUser({ user });
        res
          .status(201)
          .json({ data: createdUserId, message: 'User created Succesfully' });
      } catch (e) {
        next(e);
      }
    }
  );
}

module.exports = authApi;
