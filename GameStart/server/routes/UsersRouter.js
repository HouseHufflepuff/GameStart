const Router = require('express').Router();
const {insertUser} = require('../controllers/users.js');

Router.use('/register', insertUser);


module.exports = UsersRouter;