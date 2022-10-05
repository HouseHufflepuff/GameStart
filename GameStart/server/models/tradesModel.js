const pool = require('../connection');

const getAllTrades = (userId) => pool.query(`SELECT * FROM trades WHERE id = ${userId}`);

const saveTrade = (partyId, partyGameId, counterPartyId, counterPartyGameId, date, tradeStatus) => db.query(`INSERT INTO trades (partyId, partyGameId, counterPartyId, counterPartyGameId, created_at, trade_status) VALUES (${partyId}, ${partyGameId}, ${counterPartyId}, ${counterPartyGameId}, ${date}, ${tradeStatus}`);

const updateTradeStatus = (tradeId, tradeStatus) => pool.query(`UPDATE trades SET trade_status = ${tradeStatus} WHERE id = ${tradeId}`)

module.exports.getAllTrades = getAllTrades;
module.exports.saveTrade = saveTrade;
module.exports.updateTradeStatus = updateTradeStatus;