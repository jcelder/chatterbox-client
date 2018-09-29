var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    // console.log(event.target[0].value);
    var msg = {
      username: App.username,
      text: event.target[0].value,
      roomname: Rooms.currentRoom
    };
    Parse.create(msg, () => {
      App.fetch((data) => {
        Messages.updateMessages(data);
      } 
      );
    });
    event.target[0].value = '';
    
    // console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};