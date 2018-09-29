var Rooms = {

  rooms: {},

  currentRoom: 'lobby',

  triggerRoomsRender: function () {
    RoomsView.render();
  },

  addRoom: function ({roomname, text}) {
    if (!Rooms.rooms[roomname] && text !== '') {
      Rooms.rooms[roomname] = roomname;
    }

  },

  updateCurrentRoom: function (roomName) {
    Rooms.currentRoom = roomName;
    MessagesView.render(); 
  }

};