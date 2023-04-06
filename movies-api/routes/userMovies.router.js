const express = require('express');
const UserMoviesService = require('../services/usersMovies');
const validationHandler = require('../utils/middlewares/validationHandler');
const { movieIdSchema } = require('../utils/schemas/movies');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserMovieSchema } = require('../utils/schemas/usersMovies');
const passport = require('passport');
// JWT Strategy
require('../utils/auth/strategies/jwt');
function userMoviesApi(app) {
  const router = express.Router();

  app.use('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ userId: userIdSchema }, 'query'),
    async (req, res, next) => {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });
        res.status(200).json({
          data: userMovies,
          messsage: 'user-movies listed',
        });
      } catch (e) {
        next(e);
      }
    }
  );
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createUserMovieSchema),
    async (req, res, next) => {
      const { body: userMovie } = req;

      try {
        const createdUserMoviesId = await userMoviesService.createUserMovie({
          userMovie,
        });

        res.status(201).json({
          data: createdUserMoviesId,
          messsage: 'user movie created',
        });
      } catch (e) {
        next(e);
      }
    }
  );
  router.delete(
    '/:userMovieId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ userMovieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { userMovieId } = req.params;

      try {
        const deletedUserMoviesId = await userMoviesService.deleteUserMovie({
          userMovieId,
        });

        res.status(200).json({
          data: deletedUserMoviesId,
          messsage: 'user movie deleted',
        });
      } catch (e) {
        next(e);
      }
    }
  );
}

module.exports = userMoviesApi;
