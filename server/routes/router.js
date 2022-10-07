const Router = require('express').Router();
const usersRouter = require('./UsersRouter.js');
const gamesRouter = require('./GamesRouter.js');
const tradesRouter = require('./TradesRouter.js');
const messagesRouter = require('./MessagesRouter.js');

Router.use('/users', usersRouter);
Router.use('/games', gamesRouter);
Router.use('/trades', tradesRouter);
Router.use('/messages', messagesRouter);


module.exports = Router;