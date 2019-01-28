
const db = require('../db');

module.exports = function healthcheck(req, res, next) {
  // let connection = await db.getConnection();
  console.log('healthcheck');
  db.getConnection().then(connection => {
    connection.query('SELECT 1 + 1 AS solution', (err, results, fields) => {
      if(err) {
        return next(err);
      }
      res.send(`${results[0].solution}`);
      connection.end();
    });
  });
}
