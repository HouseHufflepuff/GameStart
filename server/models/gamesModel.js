const pool = require('../connection');

const getAllGames = () => pool.query(`SELECT * FROM games`);

const saveGames = (userId, gameId, gameTitle, photoURL, gameCondition, caseStatus) => pool.query(`INSERT INTO trades (ownerid, gameid, gametitle, photourl, gamecondition, casestatus, listingstatus) VALUES (${userId}, ${gameId}, ${gameTitle}, ${photoURL}, ${gameCondition}, ${caseStatus}, listed)`);

const updateGames = (gameId) => pool.query(`UPDATE trades SET listingstatus = traded WHERE id = ${gameId}`)

module.exports.getAllGames = getAllGames;
module.exports.saveGames = saveGames;
module.exports.updateGames = updateGames;