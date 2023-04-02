const express = require('express');
const app = express();
const morgan = require('morgan');
const { config } = require('./config');
const moviesApi = require('./routes/movies');
const { logErrors, errorHandler } = require('./utils/middlewares/errorHandler');

app.use(express.json());
app.use(morgan('dev'));

moviesApi(app); //router

app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${config.port}`);
});
