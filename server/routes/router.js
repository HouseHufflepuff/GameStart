const Router = require('express').Router();
const usersRouter = require('./UsersRouter.js');
const gamesRouter = require('./GamesRouter.js');
<<<<<<< HEAD
const LocationsRouter = require('./LocationsRouter.js');
// const TradesRouter = require('./TradesRouter.js');
// const MessagesRouter = require('./MessagesRouter.js');
// const {insertUser} = require('../controllers/users.js');
=======
const tradesRouter = require('./TradesRouter.js');
const messagesRouter = require('./MessagesRouter.js');
>>>>>>> de0c967312bc31bbd75604985007652fd347ba5f

Router.use('/users', usersRouter);
Router.use('/games', gamesRouter);
<<<<<<< HEAD
Router.use('/locations', LocationsRouter);
// Router.use('/trades', TradesRouter);
// Router.use('/messages', MessagesRouter);
=======
Router.use('/trades', tradesRouter);
Router.use('/messages', messagesRouter);
>>>>>>> de0c967312bc31bbd75604985007652fd347ba5f


module.exports = Router;
