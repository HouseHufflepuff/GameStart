const { updateAddress, createUser, addConsoles, updateProfilePicture, getTradeAmount } = require('../models/users.js')

module.exports = {
<<<<<<< HEAD
  getUsers: (req, res) => {
    console.log('get here')
    const params = req.body;
    console.log(params);
  },
=======
  insertAddress: (req, res) => {
    //should work
    //requires body params {address: address, userID: userID}
    console.log(req.body);
    const {address, userID} = req.body;
    updateAddress(address, userID)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error insertAddress')
        res.sendStatus(500);
      })
  },

>>>>>>> de0c967312bc31bbd75604985007652fd347ba5f
  insertUser: (req, res) => {
    console.log(req.body, 'this is req body')
    //requires body params {first_name: val, last_name: val, username: val, password: val, email_address: val}
    const userObj = req.body;
    createUser(userObj)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
      })
  },

  insertConsoles: (req, res) => {
    //requires body params {system: val, userID: val}
    const {system, userID} = req.body;
    addConsoles(system, userID)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error insertConsoles')
        res.sendStatus(500);
      })
  },

  changeProfilePic: (req, res) => {
    //requires body params {imageURL: val, userID: val}
    const {imageURL, userID} = req.body;
    updateProfilePicture(imageURL, userID)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log('error changeProfilePic')
        res.sendStatus(500);
      })
  },

  getTradeCounter: (req, res) => {
    //requires query params of {userID: val}
    console.log('hitting here')
    const {userID} = req.query;
    getTradeAmount(userID)
      .then((tradeCount) => {
        console.log(tradeCount)
        res.send(tradeCount);
      })
      .catch((err) => {
        console.log('error getTradeCounter')
        res.sendStatus(500);
      })
  }
}