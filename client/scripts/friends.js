var Friends = {

    friends: [],

    addFriend: function (username) {
        Friends.friends.push(username);
    },

    removeFriend: function (username) {
        Friends.friends = _.filter(Friends.friends, (friend) => {
            return friend !== username;
        })
    },

    getFriendStatus: function(username) {
        if (_.indexOf(Friends.friends, username) === -1) {
            return false;
        } else {
            return true;
        }
    }
};