const pool = require('../connection.js');
const axios = require('axios');
const LT = require('../models/locationsModel.js');


// let { address } = require('../models/locationsModel.js');

const getLocationsData = async (req, res) => {


  try {
    let response = await LT.users();
    console.log(response.rows);
    res.send(response.rows);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }


}

const getGeoLocation = async (value) => {
  let location = value.coordinate;
  const API_KEY = 'AIzaSyB1ofUAgDtm_9Br5XW4m511mCpETlvxqH8';

  let response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`);


  if (response.data.results[0] !== undefined) {
    return response.data.results[0].geometry.location;
  }
}

module.exports = {
  getLocationsData,
}