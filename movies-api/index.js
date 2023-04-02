const express = require('express');
const debug = require('debug')('app:server');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { config } = require('./config');
const moviesApi = require('./routes/movies.router');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middlewares/errorHandler');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

const whiteList = ['http://127.0.0.1:5500', 'https://myapp.co'];
const options = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new Error('Access Denied'), false);
    }
  },
};

//cors
app.use(cors(options));

// body parser
app.use(express.json());

// Logger http
app.use(morgan('dev'));

// routes
moviesApi(app);

//catch 404
app.use(notFoundHandler);

// Errors Middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  debug(`Listening on http://localhost:${config.port}`);
});
