//DEBUG=app:* node scripts/mongo/seedMovies.js

const debug = require('debug')('app:scripts:movies.js');
const chalk = require('chalk');
const MongoLib = require('../../lib/mongo');
const moviesMock = require('../../utils/mocks/movies');

async function seedMovies() {
  try {
    const mongoDB = new MongoLib();

    const promises = moviesMock.map(
      async (movie) => await mongoDB.create('movies', movie)
    );

    await Promise.all(promises);
    debug(
      chalk.cyanBright.bgBlack(
        `${promises.length} movies has been created succesfully`
      )
    );
    return process.exit(0);
  } catch (e) {
    debug(chalk.red.bgBlack(e));
    process.exit(1);
  }
}

seedMovies();
