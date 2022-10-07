const usersRouter = require('express').Router();

const { insertAddress, insertUser, insertConsoles, changeProfilePic, getTradeCounter } = require('../controllers/users.js');

usersRouter.post('/register', insertUser);

usersRouter.put('/address', insertAddress);

usersRouter.post('/consoles', insertConsoles);

usersRouter.put('/profilepic', changeProfilePic);

usersRouter.get('/tradecount', getTradeCounter);

module.exports = usersRouter;
