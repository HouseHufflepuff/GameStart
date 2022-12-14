const router = require('express').Router();
const { getLocations, getLocationsGames } = require('./controllers/locations');
const { getTrades, postTrades, putTrades } = require('./controllers/tradesController');
const { getGames, postGames, putGames } = require('./controllers/gamesController');
const { insertAddress, insertUser, insertConsoles, changeProfilePic, getTradeCounter, getUser, getUserProfile } = require('./controllers/users.js');
const { getGamesRawg, getGamesFromUser, getGamesFromTrades, addGame, getAllGames } = require('./controllers/games.js');
const { postFavorites, getFavoriteGames } = require('./controllers/favorites.js');
const controller = require('./controllers/messages.js');

// USERS
router.post('/users/register', insertUser);
router.put('/users/address', insertAddress);
router.post('/users/consoles', insertConsoles);
router.put('/users/profilepic', changeProfilePic);
router.get('/users/tradecount', getTradeCounter);
router.get('/users/:username', getUser)
router.get('/users/:userID', getUserProfile)
// GAMES
router.get('/games/gamelist', getGamesRawg)
router.get('/games/userID', getGamesFromUser)
router.get('/games/traded', getGamesFromTrades)
router.post('/games/post', addGame)
router.get('/games/all', getAllGames)
router.get('/games', getGames)
router.post('/games', postGames)
router.put('/games', putGames)
router.put('/games:gameid', putGames)
router.put('/games/gameid', putGames)

// TRADES
router.get('/trades', getTrades)
router.get('/trades:userId', getTrades)
router.get('/trades/:userId', getTrades)
router.post('/trades', postGames) //should be postTrade?
router.put('/trades', putTrades)

// LOCATION
router.use('/locations', getLocations);
router.get('/locations/games', getLocationsGames);

// MESSAGES

router.post('/messages', controller.postMessage);
router.get('/messages/:tradeId', controller.getConvoId)
router.get('/messages/conversations/:conversationId', controller.getConversation);

// FAVORITES
router.post('/favorites', postFavorites)
router.get('/favorites', getFavoriteGames)

// CONSOLES

module.exports = router