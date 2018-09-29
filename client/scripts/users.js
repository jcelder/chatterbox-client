var Users = {
  users: {},
  addUser: function(username) {
    if (!Users.users[username]) {
      Users.users[username] = _.uniqueId('user');
    } else {
      return Users.users[username];
    }
  },
  getUserIDbyUsername: function(username) {
    return Users.users[username] ? Users.users[username] : null;
  }
};