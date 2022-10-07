const Router = require('express').Router();
const { insertUser, getUsers } = require('../controllers/users.js');

Router.use('/register', insertUser);
Router.get('/register', getUsers);


module.exports = Router;