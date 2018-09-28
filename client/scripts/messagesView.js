var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function() {
    MessagesView.$chats.empty();

    for (var message of Messages.messages) {
      MessagesView.renderMessage(message);
    }
  },

  renderMessage: function (message) {
    MessagesView.$chats.append(MessageView.render(message))
  }

};