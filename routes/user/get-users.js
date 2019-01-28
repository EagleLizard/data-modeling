const db = require('../../db');
const User = require('../../models/user');

module.exports = async function getUsers(req, res, next) {
  const connection = await db.getConnection();
  let query = `SELECT * FROM users`;
  let results = (await db.runQuery(connection, query))
    .map(rawUser => new User(rawUser));
  console.log(results);
  connection.end();
  res.status(200).send(results);
}