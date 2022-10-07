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
    return pool.query(queryStr, [game])
      .then((games) => {
        return games.rows;
      })
      .catch((err) => {
        console.log(err, 'getTradedGames');
      })
  },

  postGame: () => {
    const queryStr = "INSERT INTO games (ownerid, gameid, gametitle, photourl, gamecondition, casestatus, listingstatus) VALUES (2, 5, 'title', 'imageurl', 'good', 'bad', 'rejected');";
    return pool.query(queryStr)
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
        return games;
      })
      .catch((err) => {
        console.log(err)
      })
  }
}