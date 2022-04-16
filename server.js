const express = require('express');
const app = express();
const usersRouter = require('./routers/usersRouter');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/users', usersRouter);

module.exports = app;