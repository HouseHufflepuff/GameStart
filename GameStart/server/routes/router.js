const Router = require('express').Router();
const UsersRouter = require('./UsersRouter.js');
const GamesRouter = require('./GamesRouter.js');
const TradesRouter = require('./TradesRouter.js');
const messagesRouter = require('./MessagesRouter.js');
// const {insertUser} = require('../controllers/users.js');

// Router.use('/users', UsersRouter);
// Router.use('/games'. GamesRouter);
// Router.use('/trades', TradesRouter);
Router.use('/messages', messagesRouter);


module.exports = Router;
