const express = require('express');
const morgan = require('morgan');
const shortenRouter = require('./routes/shorten.router');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api', shortenRouter);

module.exports = app;
