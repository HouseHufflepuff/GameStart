const Router = require('express').Router();
// const UsersRouter = require('./UsersRouter.js');
const gamesRouter = require('./GamesRouter.js');
const LocationsRouter = require('./LocationsRouter.js');
// const TradesRouter = require('./TradesRouter.js');
// const MessagesRouter = require('./MessagesRouter.js');
// const {insertUser} = require('../controllers/users.js');

// Router.use('/users', UsersRouter);
Router.use('/games', gamesRouter);
Router.use('/locations', LocationsRouter);
// Router.use('/trades', TradesRouter);
// Router.use('/messages', MessagesRouter);


module.exports = Router;