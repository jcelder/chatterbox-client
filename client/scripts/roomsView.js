var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
  },

  render: function() {
    RoomsView.$select.empty();
    for (var room in Rooms.rooms) {
      RoomsView.renderRoom(room);
    }
    RoomsView.$select.val(Rooms.currentRoom);
  },

  renderRoom: function(room) {
    var option = new Option(_.escape(room), _.escape(room));
    RoomsView.$select.append(option);
  }
};

