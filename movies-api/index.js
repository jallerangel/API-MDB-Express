const express = require('express');
const app = express();
const { config } = require('./config');
const moviesApi = require('./routes/movies');

moviesApi(app);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${config.port}`);
});
