const pool = require('../connection');

const getIncomingTrades = (userId) => pool.query(`SELECT trades.id, trades.partygameid, trades.counterpartygameid, trades.created_at, trades.trade_status,
myself.id as myid, myself.ownerid as myownerid, myself.gameid as mygameid, myself.gametitle as mygametitle, myself.photourl as myphotourl,
myself.gamecondition as mygamecondition, myself.casestatus as mycasestatus, myself.listingstatus as mylistingstatus,
myusers.username as myusername, myusers.profilepic as myprofilepic,
them.id as theirid, them.ownerid as theirownerid, them.gameid as theirgameid, them.gametitle as theirgametitle, them.photourl as theirphotourl,
them.gamecondition as theirgamecondition, them.casestatus as theircasestatus, them.listingstatus as theirlistingstatus,
themusers.username as theirusername, themusers.profilepic as theirprofilepic
from trades
JOIN games as myself ON trades.partygameid = myself.id
JOIN games as them ON trades.counterpartygameid = them.id
JOIN users as themusers ON them.ownerid = themusers.id
JOIN users as myusers ON myself.ownerid = myusers.id
WHERE myself.ownerid = ${userId}`);

const getOutgoingTrades = (userId) => pool.query(`SELECT trades.id, trades.partygameid, trades.counterpartygameid, trades.created_at, trades.trade_status,
myself.id as myid, myself.ownerid as myownerid, myself.gameid as mygameid, myself.gametitle as mygametitle, myself.photourl as myphotourl,
myself.gamecondition as mygamecondition, myself.casestatus as mycasestatus, myself.listingstatus as mylistingstatus,
myusers.username as myusername, myusers.profilepic as myprofilepic,
them.id as theirid, them.ownerid as theirownerid, them.gameid as theirgameid, them.gametitle as theirgametitle, them.photourl as theirphotourl,
them.gamecondition as theirgamecondition, them.casestatus as theircasestatus, them.listingstatus as theirlistingstatus,
themusers.username as theirusername, themusers.profilepic as theirprofilepic
from trades
JOIN games as myself ON trades.counterpartygameid = myself.id
JOIN games as them ON trades.partygameid = them.id
JOIN users as themusers ON them.ownerid = themusers.id
JOIN users as myusers ON myself.ownerid = myusers.id
WHERE myself.ownerid = ${userId};`);

const saveTrade = (partyGameId, counterPartyGameId, tradeStatus) => pool.query(`INSERT INTO trades (partyId, partyGameId, counterPartyId, counterPartyGameId, created_at, trade_status) VALUES (${partyGameId}, ${counterPartyGameId}, ${tradeStatus}`);

const updateTradeStatus = (tradeId, tradeStatus) => pool.query(`UPDATE trades SET trade_status = '${tradeStatus}' WHERE id = ${tradeId}`)

module.exports.getIncomingTrades = getIncomingTrades;
module.exports.getOutgoingTrades = getOutgoingTrades;
module.exports.saveTrade = saveTrade;
module.exports.updateTradeStatus = updateTradeStatus;