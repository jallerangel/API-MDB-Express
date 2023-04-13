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
    // eslint-disable-next-line no-console
    console.log(
      chalk.cyanBright.bgBlack(
        `${promises.length} movies has been created succesfully`
      )
    );
    return process.exit(0);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(chalk.red.bgBlack(e));
    process.exit(1);
  }
}

seedMovies();
