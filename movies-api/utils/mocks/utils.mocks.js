const moviesMock = require('./movies');

function filteredMoviesMock(tag) {
  return moviesMock.filter((movie) => movie.tags.includes(tag));
}

class MoviesServiceMocks {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  async getMovie() {
    return Promise.resolve(moviesMock[0]);
  }

  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

module.exports = { MoviesServiceMocks, filteredMoviesMock };
