var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch((data) => { 
      // console.log(data.results)
      Messages.updateMessages(data);
      App.stopSpinner();
      setInterval(() => {
        App.fetch((data) => {
          Messages.updateMessages(data);
        });
      }, 15000);
    });

  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      // console.log(data);

      callback(data);
    });

    // Parse.readCurrentRoom((data) => {
    //   console.log(data)
    // });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};


$('document').ready(() => {
  $('#room-selector').on('change', function (event) {
    Rooms.updateCurrentRoom(event.target.value);
  });

  $('#add-room').on('click', function () {
    var result = window.prompt('Enter new room name');

    if (result.length > 0) {
      Rooms.addRoom({roomname: result, text: ' '});
      Rooms.updateCurrentRoom(result);
      RoomsView.render();
    }
  });
});
