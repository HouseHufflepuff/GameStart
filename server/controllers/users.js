module.exports = {
  getUsers: (req, res) => {
    console.log('get here')
    const params = req.body;
    console.log(params);
  },
  insertUser: (req, res) => {
    console.log('hitting here')
    const params = req.body;
    console.log(params)
  }
}