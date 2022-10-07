const pool = require('../connection.js')


//ALL USING USER ID AT THE MOMENT (can change to firebase AUTH ID)
module.exports = {

  updateAddress: (address, userID) => {
    //query to update user address
    console.log(address, userID)
    const queryStr = `UPDATE users SET address = $1 WHERE id = $2`
    return pool.query(queryStr, [address, userID])
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err, 'updateAddress')
      })
  },

  createUser: (userInfo) => {
    //query to insert new user
    console.log(userInfo, 'this is user info')
    const queryStr = `INSERT INTO users (first_name, last_name, username, password, email) VALUES ($1, $2, $3, $4, $5)`
    const {first_name, last_name, username, password, email_address} = userInfo
    return pool.query(queryStr, [first_name, last_name, username, password, email_address])
      .then(() => {
        console.log('this is inside this')
        return;
      })
      .catch((err) => {
        console.log(err, 'createUser');
      })
  },

  addConsoles: (system, userID) => {
    //query to add consoles to user table (should be done consecutively for each console)
    const queryStr = 'INSERT INTO consoles (ownerId, console) VALUES ($1, $2)';
    return pool.query(queryStr, [userID, system])
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err, 'addConsoles');
      })
  },

  updateProfilePicture: (imageURL, userID) => {
    //query to update user profile with new profile picture url
    const queryStr = 'UPDATE users SET profilepic = $1 WHERE id = $2';
    return pool.query(queryStr, [imageURL, userID])
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err, 'updateProfilePicture');
      })
  },

  getTradeAmount: (userID) => {
    //working
    //query to return total amount of trades successful
    const queryStr = "SELECT * FROM games WHERE listingstatus = 'Traded' AND ownerid = $1";
    console.log(queryStr);
    return pool.query(queryStr, [userID])
      .then((trades) => {
        console.log(trades);
        //return the total amount of trades
        return trades.rows
      })
      .catch((err) => {
        console.log(err, 'getTradeAmount')
      })
  },

  getUserID: (username) => {
    const queryStr = "Select id from users where username = $1;";
    return pool.query(queryStr, [username])
      .then((id) => {
        console.log(id.rows)
        return id.rows;
      })
      .catch((err) => {
        console.log(err.response);
      })
  },
  getProfileData: (userID) => {
    //users table has firstname, lastname, username, address, email, profilepic

    //only required to get profile picture + be able to set description + trades made
    const queryStr = "Select profilepic, description, array(select id from trades where partygameid = $1 or counterpartygameid = $1) as user_trades from users where id = $1"
    //returns profile pic url for user, description if exists, and array of all trade ids to get length of trades (includes all trades, even pending)
    /*
    data looks like
    [{
      profilepic: url,
      description: null / string,
      user_trades: [id, id, id...id]
    }]
    */
    return pool.query(queryStr, [userID])
      .then((data) => {
        //returns just the results of query
        return data.rows;
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
}