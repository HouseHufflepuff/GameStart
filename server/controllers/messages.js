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
  models.getConversation(req.params.conversationId)
  .then((response) => {
    res.status(200);
    res.send(response);
  })
  .catch((err) => {
    res.status(500);
    res.send(err);
  })
};