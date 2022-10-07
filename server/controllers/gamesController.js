const { getAllGames, saveGames, updateGames } = require('../models/gamesModel');

const getGames = async (req, res) => {
  try {
    const result = await getAllGames()
    res.send(result.rows)
  } catch (error) {
    res.sendStatus(404);
  }
};

const postGames = async (req, res) => {
  try {
    await saveGames(req.body.userId, req.body.gameId, req.body.gameTitle, req.body.photoURL, req.body.gameCondition, req.body.caseStatus)
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

const putGames = async (req, res) => {
  try {
    await updateGames(req.body.gameId)
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports.getGames = getGames;
module.exports.postGames = postGames;
module.exports.putGames = putGames;
