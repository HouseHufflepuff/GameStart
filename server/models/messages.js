const db = require('../connection.js');

module.exports.getConversation = async (conversationId) => {
  let client = await db.connect();
  let res = await client.query(`SELECT * FROM messages WHERE conversationID=${conversationId} order by created_at desc`);
  client.release();
  return res.rows;
};

module.exports.postMessage = async (message) => {
  let client = await db.connect();
  let res = await client.query('INSERT INTO messages (body, username, conversationID) VALUES ($1, $2, $3) RETURNING id', [message.body, message.username, message.conversationId]);
  client.release();
  return res.rows;
};

module.exports.newConversation = async (message) => {
  let client = await db.connect();
  let res = await client.query('INSERT INTO conversations (messagesID) VALUES (ARRAY[$1]) RETURNING id', [message]);
  client.release();
  return res.rows;
}

module.exports.getConversationId = async (tradeId) => {
  let client = await db.connect();
  let res = await client.query(`SELECT * FROM conversations WHERE tradeid = ${tradeId}`);
  client.release();
  return res.rows;
}