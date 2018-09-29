var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function() {
    MessagesView.$chats.empty();
    var filteredResults = _.filter(Messages.messages, (message) => {
    if (Rooms.currentRoom === 'default') {
        return message;
    } else {
        return message.roomname === Rooms.currentRoom;
    }
    })
    for (var message of filteredResults) {
      MessagesView.renderMessage(message);
    }
    MessagesView.$chats.on('click', (event) => {
      var username = event.target.innerHTML;
      if (Friends.getFriendStatus(event.target.innerHTML)) {
        Friends.removeFriend(username);
      } else {
        Friends.addFriend(username)
      }
      MessagesView.highlightFriends(username);
    })
    // MessagesView.highlightAllFriends();
  },

  renderMessage: function (message) {
    if (Friends.getFriendStatus(message.username)) {
      MessagesView.$chats.append(MessageView.renderFriend(message))  
    } else {
      MessagesView.$chats.append(MessageView.render(message))
    }
  },

  highlightFriends: function (username) {
    $(`div[data-username=${username}]`).toggleClass('friend');
  },

  highlightAllFriends: function () {
    for (var friend of Friends.friends) {
      $(`div[data-username=${friend}]`).toggleClass('friend');
    }
  }

};