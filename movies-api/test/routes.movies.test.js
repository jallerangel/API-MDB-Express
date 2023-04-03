const assert = require('assert');
const proxyquire = require('proxyquire');
const { moviesMock, MoviesServiceMocks } = require('../utils/mocks/movies');
const testServer = require('../utils/schemas/testServer');

describe('routes - movies', () => {
  const route = proxyquire('../routes/movies.router.js', {
    '../services/movies': MoviesServiceMocks,
  });

  const request = testServer(route);
  describe('GET /movies', () => {
    it('should respond with status 200', (done) => {
      request.get('/api/movies').expect(200, done);
    });

    it('should respond with the list of movies', (done) => {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed',
        });
        done();
      });
    });
  });
});
