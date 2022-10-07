const Router = require('express').Router();
const usersRouter = require('./UsersRouter.js');
const gamesRouter = require('./GamesRouter.js');
const LocationsRouter = require('./LocationsRouter.js');
// const TradesRouter = require('./TradesRouter.js');
// const MessagesRouter = require('./MessagesRouter.js');
// const {insertUser} = require('../controllers/users.js');
const tradesRouter = require('./TradesRouter.js');
const messagesRouter = require('./MessagesRouter.js');

Router.use('/users', usersRouter);
Router.use('/games', gamesRouter);
Router.use('/locations', LocationsRouter);
// Router.use('/trades', TradesRouter);
// Router.use('/messages', MessagesRouter);
Router.use('/trades', tradesRouter);
Router.use('/messages', messagesRouter);


module.exports = Router;
