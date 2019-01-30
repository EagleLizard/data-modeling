
const healthcheck = require('./routes/healthcheck');
const user = require('./routes/user/index');
const location = require('./routes/location/index');

module.exports = {
  register,
};

function register(app){
  app.get('/health', healthcheck);

  app.get('/user', user.getUsers);
  app.post('/user/new', user.createUser);

  app.get('/location', location.getLocations);
}
