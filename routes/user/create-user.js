
const db = require('../../db');
const uuid = require('uuid/v4');

module.exports = async function createUser(req, res, next) {
  console.log('createUser');
  console.log(req.body);
  let body = req.body;
  try{
    const connection = await db.getConnection();
    //validate body
    let paramErrors = [];
    params = {
      username: body.username,
      firstName: body.firstName,
      lastName: body.lastName,
    };
    if(!params.username){
      paramErrors.push('username');
    }
    if(!params.firstName){
      paramErrors.push('firstName');
    }
    if(!params.lastName){
      paramErrors.push('username');
    }
    if(paramErrors.length){
      throw new Error(missingParamMessage(paramErrors));
    }
    
    let isValidUsername = await validateNewUsername(connection, params);
    if(!isValidUsername) {
      throw new Error(`Duplicate username: ${params.username}`);
    }
    let userId = await getUnusedId(connection);
    params.id = userId;

    let query = createUserSql(params);
    console.log(query);
    try {
      await db.runQuery(connection, query);
    } catch(e) {
      throw e;
    }

    res.send('OK');
  } catch(e) {
    next(e);
  }
}

function missingParamMessage(strings){
  return `Missing required parameter(s): ${strings.join(', ')}`;
}

function createUserSql(params) {
  return `INSERT INTO users VALUES (
    '${params.id}',
    '${params.username}',
    '${params.firstName}',
    '${params.lastName}',
    NOW()
  )`;
}

function getUnusedId(connection){
  return new Promise(async (resolve, reject) => {
    let id, query, isUnique;
    id = uuid();
    query = `SELECT * from users as u WHERE u.id = '${id}'`;
    isUnique = await db.runQuery(connection, query);
    console.log(isUnique);
    console.log('isUnique');
    if(!isUnique){
      id = await getUnusedId(connection);
    }
    resolve(id);
  });
}

function validateNewUsername(connection, params) {
  return new Promise(async (resolve, reject) => {
    let findByUsername;
    let query = `SELECT * FROM users as u
    WHERE u.username = '${params.username}'`;
    try {
      findByUsername = await db.runQuery(connection, query);
    }catch (e) {
      return reject(e);
    }
    resolve(findByUsername.length === 0);
  });
}
