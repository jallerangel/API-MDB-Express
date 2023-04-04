const express = require('express');
const MoviesService = require('../services/movies');
const {
  createMovieSchema,
  updateMovieSchema,
  getMovieSchema,
} = require('../utils/schemas/movies');
const validationHandler = require('../utils/middlewares/validationHandler');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');
const cacheResponse = require('../utils/cacheResponse');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesService = new MoviesService();

  router.get('/', async (req, res, next) => {
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
  });

  router.get(
    '/:movieId',
    validationHandler(getMovieSchema, 'params'),
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
    validationHandler(getMovieSchema, 'params'),
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
    validationHandler(getMovieSchema, 'params'),
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
    validationHandler(getMovieSchema, 'params'),
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
