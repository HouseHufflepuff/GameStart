const { getAllTrades, saveTrade, updateTradeStatus } = require('../models/tradesModel')

const getTrades = async (req, res) => {
  const params = req.body.userId || req.params.userId || req.query.userId;
  try {
    const result = await getAllTrades(params);
    res.send(result)
  } catch (error) {
    res.sendStatus(404);
  }
};

const postTrades = async (req, res) => {
  try {
    const result = await saveTrade(req.body.partyId, req.body.partyGameId, req.body.counterPartyId, req.body.counterPartyGameId, Date.now(), 'pending');
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(404);
  }
};

const putTrades = async (req, res) => {
  try {
    const result = await updateTradeStatus(req.body.userId, req.body.status);
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.getTrades = getTrades;
module.exports.postTrades = postTrades;
module.exports.putTrades = putTrades;
