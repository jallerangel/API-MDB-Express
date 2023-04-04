const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', () => {
  describe('when receives an entity and an action', function () {
    it('should return the respective message', () => {
      const result = buildMessage('movie', 'create');
      const expect = 'movie created';
      assert.strictEqual(result, expect);
    });
  });

  describe('when receives an entity and an action and is a list', () => {
    it('should return the respective messafe with the entity in prural', () => {
      const result = buildMessage('movie', 'list');
      const expect = 'movies listed';
      assert.strictEqual(result, expect);
    });
  });
});
