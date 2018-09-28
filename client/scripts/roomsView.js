var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
  },

  render: function() {
    for (var room in Rooms.rooms) {
      console.log(room);
      var option = new Option(_.escape(room), _.escape(room))
      RoomsView.$select.append(option);
    }
    RoomsView.$select.val(Rooms.currentRoom)
  },
};