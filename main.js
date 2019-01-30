
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const routes = require('./routes');
const db = require('./db');
const initDb = require('./schema/init-db');

const PORT = 3000;

main();

async function main() {
  await db.init();
  await initDb.initCountries();
  await initDb.initLocations();

  app.use(bodyParser.json());
  routes.register(app);
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      statusCode: 500,
      error: err.message || 'Something broke'
    });
  });
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
