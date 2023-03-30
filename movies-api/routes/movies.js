const express = require('express');
const { moviesMock } = require('../utils/mocks/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);

  router.get('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock);
      res.status(200).json({
        data: movies,
        message: 'movies listed',
      });
    } catch (e) {
      next(e);
    }
  });

  router.get('/:movieId', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock[0]);
      res.status(200).json({
        data: movies,
        message: 'movie retrieve',
      });
    } catch (e) {
      next(e);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const movies = await Promise.resolve(moviesMock);
      res.status(201).json({
        data: movies,
        message: 'movie created',
      });
    } catch (e) {
      next(e);
    }
  });

  router.put('/:movieId', async (req, res, next) => {
    try {
      const updatedMovieId = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: updatedMovieId,
        message: 'movies updated',
      });
    } catch (e) {
      next(e);
    }
  });

  router.delete('/:movieId', async (req, res, next) => {
    try {
      const deletedMovie = await Promise.resolve(moviesMock[0].id);
      res.status(200).json({
        data: deletedMovie,
        message: 'movies deleted',
      });
    } catch (e) {
      next(e);
    }
  });
}

module.exports = moviesApi;
