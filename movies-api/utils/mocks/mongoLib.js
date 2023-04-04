const sinon = require('sinon');
const { moviesMock } = require('./movies');
const { filteredMoviesMock } = require('./utils.mocks');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const getStub = sinon.stub();
const movieId = 0;
getStub.withArgs('movies', movieId).resolves(moviesMock[movieId]);

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }

  get(collection, movieId) {
    return getStub(collection, movieId);
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = { createStub, getAllStub, getStub, MongoLibMock };
