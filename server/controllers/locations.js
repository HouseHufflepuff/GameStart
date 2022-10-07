require('dotenv').config();
const pool = require('../connection.js');
const axios = require('axios');
const LT = require('../models/locations.js');


let { address } = require('../models/locations.js');

const getLocations = async (req, res) => {
  try {
    let response = await LT.users();
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

const getLocationsGames = async (req, res) => {
  try {
    let response = await LT.games();
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}



const getGeoLocation = async (value) => {
  let location = value.coordinate;
  const API_KEY = process.env.GOOGLE_API;

  let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`);


  if (response.data.results[0] !== undefined) {
    return response.data.results[0].geometry.location;
  }
}

module.exports = {
  getLocations,
  getLocationsGames,
}