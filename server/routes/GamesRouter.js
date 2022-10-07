const gamesRouter = require('express').Router();

const {getGames, getGamesFromUser, getGamesFromTrades, addGame, getAllGames} = require('../controllers/games.js');

gamesRouter.get('/gamelist', getGames)

gamesRouter.get('/userID', getGamesFromUser)

gamesRouter.get('/traded', getGamesFromTrades)

gamesRouter.post('/post', addGame)

gamesRouter.get('/all', getAllGames)

module.exports = gamesRouter;