const Router = require('express').Router();
const {
  getLocations,
  getLocationsGames
} = require('../controllers/locations.js');

Router.get('/', getLocations);

module.exports = Router;