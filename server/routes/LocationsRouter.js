const Router = require('express').Router();
const {
  getLocationsData,
} = require('../controllers/locations.js');

Router.get('/', getLocationsData);

module.exports = Router;