require('dotenv').config();
const {getUsersGames, getTradedGames, postGame, getAll} = require('../models/games.js');
const axios = require('axios');

module.exports = {

  getGamesRawg: (req, res) => {
    if (req.query.hasOwnProperty('games')) {
      axios.get(`${process.env.API_BASE_URL}/games?key=${process.env.API_KEY}&search=${req.query.games}`)
      .then((games) => {
        res.send(games.data.results);
      })
      .catch((err) => {
        console.log('no game with title', err);
      })
    } else if (req.query.hasOwnProperty('genres')) {
      axios.get(`${process.env.API_BASE_URL}/games?key=${process.env.API_KEY}&genres=${req.query.genres}`)
      .then((games) => {
        res.send(games.data.results);
      })
      .catch((err) => {
        console.log('no game with genre', err)
      })
    } else {
      axios.get(`${process.env.API_BASE_URL}/games?key=${process.env.API_KEY}`)
      .then((games) => {
        res.send(games.data.results);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },

  getGamesFromUser: (req, res) => {
    //requires a param w/ userID key and ID value
    //tested
    const {userID} = req.query;
    getUsersGames(userID)
      .then((games) => {
        console.log(games, 'this is games')
        res.send(games);
      })
      .catch((err) => {
        console.log('error getGamesFromUser')
        res.sendStatus(500)
      })
  },

  getGamesFromTrades: (req, res) => {
    //requires a query param with key game and title value
    //EXACT MATCH
    const {game} = req.query;
    getTradedGames(game)
      .then((games) => {
        res.send(games);
      })
      .catch((err) => {
        console.log('error getGamesFromTrades')
        res.sendStatus(500);
      })
  },

  addGame: (req, res) => {
    //requires body w/ following keys and values assigned to that key
    //break down game object into smaller parts
    //what is game object
    const {ownerid, id, name, background_image} = req.body
    postGame(ownerid, id, name, background_image)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  },

  //working
  getAllGames: (req, res) => {
    getAll()
      .then((games) => {
        res.send(games);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}