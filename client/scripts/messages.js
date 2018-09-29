var Messages = {
    
  messages: [],

  messageIds: {},

  updateMessages: function ({results}) {
    // solely responsible for updating state --> messages state
    // console.log(results);
    for (var result of results) {
      if (Messages.messageIds[result.objectId]) {
        continue;
      } else {
        Messages.messageIds[result.objectId] = result.objectId;
      }
      if (result.username && result.text) {
        if (result.roomname === '' || !result.roomname) {
          result.roomname = 'default';
        } 
        Messages.messages.unshift(result);
        Rooms.addRoom(result);
        Users.addUser(_.escape(result.username));
        result.userId = Users.getUserIDbyUsername(_.escape(result.username));
      }
    }
    Messages.triggerRender();
  },

  triggerRender: function () {
    MessagesView.render();
    Rooms.triggerRoomsRender();
  }

};