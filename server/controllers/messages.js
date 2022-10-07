const models = require('../models/messages.js');

module.exports.postMessage = (req, res) => {
  console.log(req.body);
  models.postMessage(req.body)
  .then((response) => {
    res.status(201);
    res.send(response);
  })
  .catch((err) => {
    res.status(500);
    res.send(err);
  })
};

module.exports.getConversation = (req, res) => {
  console.log('hi')
  models.getConversation(req.params.conversationId)
  .then((response) => {
    res.send(response);
  })
  .catch((err) => {
    res.status(500);
    res.send(err);
  })
};

module.exports.getConvoId = (req, res) => {
  console.log(req.params.tradeId)
  models.getConversationId(req.params.tradeId)
  .then((response) => {
    res.send(response);
  })
  .catch((err) => {
    res.status(500);
    res.send(err);
  })
};