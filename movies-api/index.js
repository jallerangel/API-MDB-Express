const express = require('express');

const app = express();

const { config } = require('./config');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/json', (req, res) => {
  res.json({ Hello: 'World' });
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on http://localhost:${config.port}`);
});
