const express = require('express');

const MoviesService = require('../services/movies');

function moviesApi(app) {
  const router = express.Router();
  app.use('/api/movies', router);
  const moviesService = new MoviesService();

  router.get('/', async (req, res, next) => {
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

  router.get('/:movieId', async (req, res, next) => {
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
  });

  router.post('/', async (req, res, next) => {
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
  });

  router.put('/:movieId', async (req, res, next) => {
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
  });

  router.delete('/:movieId', async (req, res, next) => {
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
  });

  router.patch('/:movieId', async (req, res, next) => {
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
  });
}

module.exports = moviesApi;

// La unica responsabilidad de las rutas es saber como recibe parametros y como se los entrega a los servicios, que son la logica de negocio.
// Mientras que los servicios si saben que hacer con todos los parametros y datos y devolver la informacion que le estamos requiriendo.
