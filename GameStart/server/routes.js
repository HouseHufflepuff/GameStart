const router = require('express').Router();
const { getTrades } = require('./controllers/tradesController')

// USERS

// GAMES

// TRADES
router.get('/trades', getTrades)
router.get('/trades:userId', getTrades)
router.get('/trades/userId', getTrades)
router.post('/trades')
router.put('/trades')

// MESSAGES

// FAVORITES

// CONSOLES

module.exports = router