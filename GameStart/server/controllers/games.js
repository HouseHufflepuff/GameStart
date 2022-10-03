require('dotenv').config();
// const {} = require('../models');
const axios = require('axios');

module.exports = {

  getGames: (req, res) => {
    if (req.query.hasOwnProperty('games')) {
      axios.get(`${process.env.API_BASE_URL}/games?key=${process.env.API_KEY}&search=${req.query.games}`)
      .then((games) => {
        res.send(games);
      })
      .catch((err) => {
        console.log('no game with title', err);
      })
    } else if (req.query.hasOwnProperty('genres')) {
      axios.get(`${process.env.API_BASE_URL}/games?key=${process.env.API_KEY}&genres=${req.query.genres}`)
      .then((games) => {
        res.send(games);
      })
      .catch((err) => {
        console.log('no game with genre', err)
      })
    } else {
      axios.get(`${process.env.API_BASE_URL}/games?key=${process.env.API_KEY}`)
      .then((games) => {
        res.send(games);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}