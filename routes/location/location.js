
const db = require('../../db');

module.exports = {
  getLocations,
}

async function getLocations(req, res, next){
  let connection = await db.getConnection();
  let query = `SELECT l.id as location_id, c.id as country_id, location_name, country_name
    FROM location l INNER JOIN country c ON l.country_id WHERE l.country_id = c.id`;
  let results;
  try {
    results = await db.runQuery(connection, query);
  } catch(e) {
    console.error(e);
    next(e);
  } finally {
    connection.end();
  }
  res.status(200).send(results);
}
