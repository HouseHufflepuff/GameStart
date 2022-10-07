<<<<<<< HEAD
const Router = require('express').Router();
const { insertUser, getUsers } = require('../controllers/users.js');

Router.use('/register', insertUser);
Router.get('/register', getUsers);
=======
const usersRouter = require('express').Router();

const {insertAddress, insertUser, insertConsoles, changeProfilePic, getTradeCounter} = require('../controllers/users.js');
>>>>>>> de0c967312bc31bbd75604985007652fd347ba5f

usersRouter.post('/register', insertUser);

usersRouter.put('/address', insertAddress);

usersRouter.post('/consoles', insertConsoles);

usersRouter.put('/profilepic', changeProfilePic);

usersRouter.get('/tradecount', getTradeCounter);

module.exports = usersRouter;

//tradecount