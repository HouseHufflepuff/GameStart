const {addFavorites, getFavorites} = require('../models/favorites.js');

module.exports = {

  postFavorites: (req, res) => {
    const {gameID, userID} = req.body;
    addFavorites(gameID, userID)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err.response);
      })
  },

  getFavoriteGames: (req, res) => {
    const {userID} = req.query;
    getFavorites(userID)
      .then((games) => {
        res.send(games);
      })
      .catch((err) => {
        console.log(err.response);
      })
  }
}