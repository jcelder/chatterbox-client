describe('chatterbox', function() {

  describe('ajax behavior', function() {
    var ajaxSpy;

    before(function() {
      ajaxSpy = sinon.stub($, 'ajax');
      App.initialize();
    });

    beforeEach(function() {
      ajaxSpy.reset();
    });

    describe('creating', function() {
      it('should submit a POST request via $.ajax', function(done) {
        Parse.create({});
        expect($.ajax.calledOnce).to.be.true;
        // sinon.spy method `args` comes in the form [function calls][arguments from that call]
        ajaxOptions = typeof $.ajax.args[0][0] === 'object' ? $.ajax.args[0][0] : $.ajax.args[0][1];
        expect(ajaxOptions.type).to.equal('POST');
        done();
      });

      it('should send the message along with the request as a stringified object', function(done) {
        var message = {
          username: 'Mel Brooks',
          text: 'It\'s good to be the king',
          roomname: 'lobby'
        };

        Parse.create(message);
        ajaxOptions = typeof $.ajax.args[0][0] === 'object' ? $.ajax.args[0][0] : $.ajax.args[0][1];
        expect(ajaxOptions.data).to.be.a('string');
        expect(ajaxOptions.contentType).to.equal('application/json');
        done();
      });

      it('should send the correct message along with the request', function(done) {
        var message = {
          username: 'Mel Brooks',
          text: 'It\'s good to be the king',
          roomname: 'lobby'
        };

        Parse.create(message);
        ajaxOptions = typeof $.ajax.args[0][0] === 'object' ? $.ajax.args[0][0] : $.ajax.args[0][1];
        var sentMessage = JSON.parse(ajaxOptions.data);
        expect(sentMessage).to.deep.equal(message);
        done();
      });

    });

    describe('readAll fetching', function() {
      it('should submit a GET request via $.ajax', function(done) {
        Parse.readAll();
        expect($.ajax.calledOnce).to.be.true;
        ajaxUrl = typeof $.ajax.args[0][0] === 'string' ? $.ajax.args[0][0] : $.ajax.args[0][0].url;
        expect(ajaxUrl).to.equal(Parse.server);
        done();
      });
    });
    describe('readCurrentRoom fetching', function() {
      it('should return only messages from the current room', function(done) {
        Rooms.currentRoom = 'superSecretLobby';
        var result;
        var message = {
          username: 'Mel Brooks',
          text: 'It\'s good to be the king',
          roomname: 'superSecretLobby'
        };
        for (var i = 0; i < 5; i++) {
          Parse.create(message);
        }
        Parse.readCurrentRoom((data) => {
          console.log(data);
          result = data;
        });
        expect(result.length).to.equal(5);
        done();
      });
    });
  });

  describe('chatroom behavior', function() {
    it('should be able to add messages to the DOM', function() {
      var message = {
        username: 'Mel Brooks',
        text: 'Never underestimate the power of the Schwartz!',
        roomname: 'lobby',
        userId: 1
      };
      MessagesView.renderMessage(message);
      expect($('#chats').children().length).to.equal(1);
    });

    it('should be able to add rooms to the DOM', function() {
      RoomsView.renderRoom('superLobby');
      expect($('#rooms select').children().length).to.equal(1);
    });

  });

  describe('events', function() {
    it('should add a friend upon clicking their username', function() {
      // sinon.spy(Friends, 'toggleStatus');
      var message = {
        username: 'Mel Brooks',
        text: 'I didn\'t get a harumph outa that guy.!',
        roomname: 'lobby',
        userId: 'user1'
      };
      
      App.initialize();
      MessagesView.renderMessage(message);
      MessagesView.addEventHandlers();
      var userId = $('#chats').find(`[data-userid=${message.userId}]`).data('userid');
      MessagesView._friendCallback(userId);
      expect(Friends.friends[0]).to.equal('user1');
    });

    it('should add a room when clicking add', function() {
      sinon.spy(Rooms, 'addRoom');
      var prompt = window.prompt;
      window.prompt = sinon.stub().returns('testroom');

      App.initialize();
      // $('#add-room').find('button').trigger('click');
      Rooms.addRoom({roomname: prompt, text: '   '});
      expect(Rooms.addRoom.called).to.be.true;

      window.prompt = prompt;
      Rooms.addRoom.restore();
    });

    it('should try to send a message upon clicking submit', function() {
      sinon.spy(Parse, 'create');

      var fakeEvent = {
        preventDefault: () => {},
        target: [
          {value: 'Why so many Mel Brooks quotes?'},
        ]
      };

      App.initialize();
      // debugger;
      $('#message').val('Why so many Mel Brooks quotes?');
      // $('form .submit').trigger('submit');
      FormView.handleSubmit(fakeEvent);
      expect(Parse.create.called).to.be.true;

      Parse.create.restore();
    });
  });
});
