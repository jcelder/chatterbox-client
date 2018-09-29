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
    });
    for (var message of filteredResults) {
      MessagesView.renderMessage(message);
    }
    MessagesView.addEventHandlers();
  },

  renderMessage: function (message) {
    if (Friends.getFriendStatus(message.userId)) {
      MessagesView.$chats.append(MessageView.renderFriend(message));  
    } else {
      MessagesView.$chats.append(MessageView.render(message));
    }
  },

  addEventHandlers: function() {
    MessagesView.$chats.off('click');
    MessagesView.$chats.on('click', (event) => {
      var userId = event.target.parentNode.getAttribute('data-userid');
      if (Friends.getFriendStatus(userId)) {
        Friends.removeFriend(userId);
      } else {
        Friends.addFriend(userId);
      }
      MessagesView.render();
    });
  }
};