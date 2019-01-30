
const db = require('../db');

const COUNTRIES = [
  'Unites States',
  'Mexico',
  'Ireland',
  'Australia',
  'China',
  'Japana',
  'Korea',
];

const LOCATIONS = [
  ['Orem', COUNTRIES[0]],
  ['Salt Lake City', COUNTRIES[0]],
  ['San Francisco', COUNTRIES[0]],
  ['New York', COUNTRIES[0]],
  ['Los Angeles', COUNTRIES[0]],
  ['Austin', COUNTRIES[0]],
  ['Mexico City', COUNTRIES[1]],
  ['Dublin', COUNTRIES[2]],
  ['Melbourne', COUNTRIES[3]],
  ['Sydney', COUNTRIES[3]],
  ['Beijing', COUNTRIES[4]],
  ['Hong Kong', COUNTRIES[4]],
  ['Tokyo', COUNTRIES[5]],
  ['Seoul', COUNTRIES[6]],
];

module.exports = {
  initCountries,
  initLocations,
};

async function initCountries() {
  //wrap countries in quotes and transform into tuples
  let countries = COUNTRIES.map(country => [`'${country}'`]);
  return await insertMultiple('country', ['country_name'], countries);
}

async function initLocations() {
  let queries = LOCATIONS.map(locationTuple => {
    let [locationName, country] = locationTuple;
    return `INSERT IGNORE INTO location (location_name, country_id) VALUES ('${locationName}', (SELECT id FROM country WHERE country_name = '${country}'))`;
  });
  let connection = await db.getConnection();
  let queryPromises = queries.map(query => {
    return db.runQuery(connection, query);
  });
  try {
    await Promise.all(queryPromises);
  } catch(e) {
    console.error(e);
    throw e;
  } finally {
    connection.end();
  }
  return;
}

async function insertMultiple(table, cols, rows) {
  rows = rows.map(row => {
    return `(${row.join(',')})`;
  });
  let tuples = rows.join(',');
  let query = `INSERT IGNORE INTO ${table} (${cols.join(',')}) VALUES ${tuples}`;
  let connection = await db.getConnection();
  try {
    await db.runQuery(connection, query);
  } catch(e) {
    console.error(e);
    throw e;
  } finally {
    connection.end();
  }
}
