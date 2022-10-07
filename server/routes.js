const router = require('express').Router();
const { getTrades, postTrades, putTrades } = require('./controllers/tradesController');
const { getGames, postGames, putGames } = require('./controllers/gamesController');
const { getLocationsData } = require('./controllers/locations');
const { getRoughCompassDirection } = require('geolib');

// USERS

// GAMES
router.get('/games', getGames)
router.post('/games', postGames)
router.put('/games', putGames)
router.put('/games:gameid', putGames)
router.put('/games/gameid', putGames)

// TRADES
router.get('/trades', getTrades)
router.get('/trades:userId', getTrades)
router.get('/trades/:userId', getTrades)
router.post('/trades')
router.put('/trades')


// LOCATION
router.use('/locations', getLocationsData);

// MESSAGES

// FAVORITES

// CONSOLES

module.exports = router