const express = require('express');
const app = express();
const apiRouter = require('./routers/apiRouter');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api', apiRouter);

module.exports = app;