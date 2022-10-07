const path = require('path');
require('dotenv').config()
const axios = require('axios');

const URL = 'http://localhost:8000/api'

const Parse = {
  // RAWG API
  getGames: (req, res) => {
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


  //GameStart API/Database

  get: (endpoint, data) => {
    return axios.get(`${URL}${endpoint}`, data)
  },

  create: (endpoint, data) => {
    return axios.post(`${URL}${endpoint}`, data)
  },

  update: (endpoint, data = {}) => {
    return axios.put(`${URL}${endpoint}`, data)
  },
}

export default Parse;