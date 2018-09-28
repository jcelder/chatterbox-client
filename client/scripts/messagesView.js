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
    console.log(filteredResults)
    for (var message of filteredResults) {
      MessagesView.renderMessage(message);
    }
  },

  renderMessage: function (message) {
    MessagesView.$chats.append(MessageView.render(message))
  }

};