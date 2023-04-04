const assert = require('assert');
const proxyquire = require('proxyquire');
const {
  getAllStub,
  getStub,
  MongoLibMock,
} = require('../utils/mocks/mongoLib');
const moviesMock = require('../utils/mocks/movies');

///////

describe.only('services - movies', () => {
  const MoviesSevices = proxyquire('../services/movies', {
    '../lib/mongo.js': MongoLibMock,
  });

  const moviesService = new MoviesSevices();

  describe('when get movies method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(result, expected);
    });
  });
  describe('when get movies method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await moviesService.getMovie({});
      assert.strictEqual(getStub.called, true);
    });

    // it('should return an array of movies', async () => {
    //   const result = await moviesService.getMovies({});
    //   const expected = moviesMock;
    //   assert.deepEqual(result, expected);
  });
});
