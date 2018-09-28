var Rooms = {

    rooms: {},

    currentRoom: 'default',

    triggerRoomsRender: function ()  {
        RoomsView.render();
    },

    addRoom: function (room) {
        if (!Rooms.rooms[rooms]) {
            Rooms.rooms[room] = room
        }

    }

};