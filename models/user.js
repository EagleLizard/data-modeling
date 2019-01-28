
module.exports = class User {
  constructor(rawUser) {
    this.id = rawUser.id;
    this.username = rawUser.username;
    this.firstName = rawUser.first_name;
    this.lastName = rawUser.last_name;
    this.joinDate = rawUser.join_date;
  }
}
