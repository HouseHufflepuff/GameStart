const { getIncomingTrades, getOutgoingTrades, saveTrade, updateTradeStatus } = require('../models/tradesModel')

const getTrades = async (req, res) => {
  const params = req.body.userId || req.params.userId || req.query.userId;
  console.log(params)
  try {
    const incoming = await getIncomingTrades(params);
    const outgoing = await getOutgoingTrades(params);
    const result = {
      incoming: incoming.rows,
      outgoing: outgoing.rows
    }
    res.send(result)
  } catch (error) {
    res.sendStatus(404);
  }
};

const postTrades = async (req, res) => {
  try {
    const result = await saveTrade(req.body.partyGameId, req.body.counterPartyGameId, 'pending');
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(404);
  }
};

const putTrades = async (req, res) => {
  try {
    console.log('hi')
    await updateTradeStatus(req.body.tradeId, req.body.status);
    console.log('bye')
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.getTrades = getTrades;
module.exports.postTrades = postTrades;
module.exports.putTrades = putTrades;

