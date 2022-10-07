const pool = require('../connection');

module.exports = {
  addFavorites: (gameID, userID) => {
    const queryStr = 'INSERT INTO favorites (gameID, userID) VALUES ($1, $2);'
    return pool.query(queryStr, [gameID, userID])
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err.response);
      })
  },

  getFavorites: (userID) => {
    const queryStr = 'SELECT gametitle from games where id = (select gameid from favorites where userid = $1);'
    return pool.query(queryStr, [userID])
      .then((games) => {
        return games.rows;
      })
      .catch((err) => {
        console.log(err.response);
      })
  }
}