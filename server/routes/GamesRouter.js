const gamesRouter = require('express').Router();

const {getGames} = require('../controllers/games.js');

gamesRouter.get('/gamelist', getGames)

module.exports = gamesRouter;