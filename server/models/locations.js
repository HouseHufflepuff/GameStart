const pool = require('../connection.js');

module.exports = {
  users: (params) => {

    let queryString = `SELECT users.id, users.first_name, users.last_name, users.username, games.gametitle, games.photourl, games.gamecondition, games.listingstatus,
    consoles.console, locations.longitude, locations.latitude
                      FROM users INNER JOIN games
                      ON users.id = games.ownerid AND games.listingstatus = 'Listed'
                      INNER JOIN consoles
                      ON games.consoleid = consoles.id
                      INNER JOIN locations
                      ON locations.ownerid = users.id
                      `;

    return pool.query(queryString);
  },
  games: (params) => {
    let queryString = `select games.gametitle, count(*) from games where games.listingstatus = 'Traded' group by games.gametitle`
    return pool.query(queryString);
  }
}