const express = require('express');
const passport = require('passport');
const MoviesService = require('../services/movies');
const {
  updateMovieSchema,
  getDeleteMovieSchema,
  createMovieSchema,
} = require('../utils/schemas/movies');
const validationHandler = require('../utils/middlewares/validationHandler');
const scopesValidationHandler = require('../utils/middlewares/scopesValidationHandler');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');
const cacheResponse = require('../utils/cacheResponse');
// JWT Strategy
require('../utils/auth/strategies/jwt');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesService = new MoviesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { tags } = req.query;
      try {
        const movies = await moviesService.getMovies({ tags });
        res.status(200).json({
          data: movies,
          message: 'movies listed',
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.get(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:movies']),
    validationHandler(getDeleteMovieSchema, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { movieId } = req.params;
      try {
        const movies = await moviesService.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: 'movie retrieve',
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['create:movies']),
    validationHandler(createMovieSchema, 'body'),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const movies = await moviesService.createMovie({ movie });
        res.status(201).json({
          data: movies,
          message: 'movie created',
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.put(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:movies']),
    validationHandler(getDeleteMovieSchema, 'params'),
    validationHandler(updateMovieSchema, 'body'),
    async (req, res, next) => {
      const { body: movie } = req;
      const { movieId } = req.params;
      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: 'movies updated',
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.delete(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['delete:movies']),
    validationHandler(getDeleteMovieSchema, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const deletedMovie = await moviesService.deleteMovie({ movieId });
        res.status(200).json({
          data: deletedMovie,
          message: 'movies deleted',
        });
      } catch (e) {
        next(e);
      }
    }
  );

  router.patch(
    '/:movieId',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['update:movies']),
    validationHandler(getDeleteMovieSchema, 'params'),
    validationHandler(updateMovieSchema, 'body'),
    async (req, res, next) => {
      const { movieId } = req.params;
      const { body: moviePart } = req;
      try {
        const updatedMovie = await moviesService.updateMoviePart({
          movieId,
          moviePart,
        });
        res.status(200).json({
          data: updatedMovie,
          message: 'movie updated',
        });
      } catch (e) {
        next(e);
      }
    }
  );
}

module.exports = moviesApi;
