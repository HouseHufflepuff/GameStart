const pool = require('../connection.js')

module.exports = {
  getUsersGames: (userID) => {
    console.log('hitting here')
    const queryStr = 'SELECT * FROM games WHERE ownerId = $1';
    return pool.query(queryStr, [userID])
      .then((games) => {
        return games.rows;
      })
      .catch((err) => {
        console.log(err, 'getUsersGames');
      })
  },

  getTradedGames: (game) => {
    const queryStr = 'SELECT * FROM games WHERE gametitle = $1';
    console.log(game)
    return pool.query(queryStr, [game])
      .then((games) => {
        console.log(games);
        return games.rows;
      })
      .catch((err) => {
        console.log(err, 'getTradedGames');
      })
  },

  postGame: (ownerid, gameid, gametitle, photourl) => {
    const queryStr = "INSERT INTO games (ownerid, gameid, gametitle, photourl, consoleid) VALUES ($1, $2, $3, $4, (select id from consoles where ownerid = $1));";
    return pool.query(queryStr, [ownerid, gameid, gametitle, photourl])
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err);
      })
  },

  getAll: () => {
    console.log('hitting here')
    const queryStr = 'Select * from games';
    return pool.query(queryStr)
      .then((games) => {
        console.log(games)
        return games.rows;
      })
      .catch((err) => {
        console.log(err)
      })
  }
}