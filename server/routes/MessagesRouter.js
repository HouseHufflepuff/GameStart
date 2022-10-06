const messagesRouter = require('express').Router();
const controller = require('../controllers/messages.js');

messagesRouter.post('/', controller.postMessage);

messagesRouter.get('/conversations/:conversationId', controller.getConversation);

module.exports = messagesRouter;
