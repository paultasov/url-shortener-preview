const shortenRouter = require('express').Router();
const ShortenController = require('../controllers/shorten.controller');

shortenRouter.post('/shorten', ShortenController.CreateLink);
shortenRouter.get('/:shortCode', ShortenController.Redirect);

module.exports = shortenRouter;
