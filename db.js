
const fs = require('fs');
const mysql = require('mysql');

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'DATA_MODELS',
};

const createScriptPaths = [
  `${__dirname}/schema/user.sql`,
];

module.exports = {
  getConnection,
  init,
  runQuery,
};

// let connection;

async function getConnection() {
  return new Promise((resolve, reject) => {
    let connection = mysql.createConnection(config);
    connection.connect((err) => {
      if(err) return reject(err);
      resolve(connection);
    });
  });
}

async function init() {
  const connection = await getConnection();
  // load create scripts
  let createScripts = await Promise.all(
    createScriptPaths.map(path => 
      loadFile(path)
    )
  );
  // get rid of whitespcae
  createScripts = createScripts.map(script => 
    script.replace(/\n/g,  ' ')
  );
  console.log(createScripts);
  let creates = Promise.all(
    createScripts.map(script => 
      runQuery(connection, script)
    )
  );
  try {
    await creates;
  } catch(e) {
    throw e;
  }
  return connection.end();
}

function runQuery(connection, query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results, fields) => {
      if(err) return reject(err);
      resolve(results);
    });
  });
}

function loadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if(err) return reject(err);
      resolve(data.toString());
    });
  });
}