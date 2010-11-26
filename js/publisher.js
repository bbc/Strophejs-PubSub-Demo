var Control = {
  // start admin credentials
  admin_jid: 'bbc@vm.local',
  admin_pass: 'bbc',
  // end admin credentials

  pubsub_server: 'pubsub.' + Config.XMPP_SERVER,
  connection: null,
  connected: false,
  show_raw: true,
  show_log: true,

  // log to console if available
  log: function (msg) { 
    if (Control.show_log && window.console) {
      console.log(msg);
    }
  },

  // simplify connection status messages
  feedback: function(msg, col) {
    $('#connection_status').html(msg).css('color', col);
  },
  
  // show the raw XMPP information coming in
  raw_input: function (data)  { 
    if (Control.show_raw) {
      Control.log('RECV: ' + data);
    }
  },

  // show the raw XMPP information going out
  raw_output: function (data) { 
    if (Control.show_raw) {
      Control.log('SENT: ' + data);
    }
  },

  // called when data is deemed as sent
  on_send: function (data) {
    Control.log("Data Sent");
    $('#message').val('');
    $('#progress').text('message sent').fadeIn().fadeOut(5000);

    return true;
  },

  // push the data to the clients
  publish: function (data) {
    if (data.message == '') return;
    var _d = $build('data', { 'type' : data.type }).t(data.message).toString(); 

    Control.connection.pubsub.publish(
      Control.admin_jid,
      Control.pubsub_server,
      Config.PUBSUB_NODE,
      [_d],
      Control.on_send
    );
  },

  // initialiser
  init: function () {
    Control.connection.send($pres());
    var _p = $('#publish');
    _p.fadeIn();

    _p.click(function(event) {
      event.preventDefault();

      var _obj = {
        'message' : $('textarea').val(),
        'type'    : MessageType[$('input:radio:checked').val()]
      }

      Control.publish(_obj);    
    });

    return false;
  },

  // called when we have either created a node
  // or the one we're creating is available
  on_create_node: function (data) {
    Control.feedback('Connected', '#00FF00');
    Control.init();
  },
}

$(document).ready(function () {
  Control.log('Ready to go...');
  $(document).trigger('connect');
});

// this does the initial connection to the XMPP server
$(document).bind('connect', function () {
  var conn = new Strophe.Connection(Config.BOSH_SERVICE);
  Control.connection = conn;
  Control.connection.rawInput = Control.raw_input;
  Control.connection.rawOutput = Control.raw_output;
  Control.connection.addHandler(Control.on_result, null, "message", null, null);
  Control.connection.connect(
    Control.admin_jid, Control.admin_pass, function (status) {
      if (status == Strophe.Status.CONNECTING) {
        Control.log('Connecting...');
        Control.feedback('Connecting... (1 of 2)', '#009900');
      } else if (status == Strophe.Status.CONNFAIL) {
        Control.log('Failed to connect!');
        Control.feedback('Connection failed', '#FF0000');
      } else if (status == Strophe.Status.DISCONNECTING) {
        Control.log('Disconnecting...');
        Control.feedback('Disconnecting...', '#CC6600');
      } else if (status == Strophe.Status.DISCONNECTED) {
        Control.log('Disconnected');
        Control.feedback('Disconnected', '#aa0000');
        $(document).trigger('disconnected');
      } else if (status == Strophe.Status.CONNECTED) {
        $(document).trigger('connected');
      }
    }
  );
});

$(document).bind('connected', function () {
  Control.feedback('Connecting... (2 of 3)', '#00CC00');

  // first we make sure the pubsub node exists
  // buy trying to create it again
  Control.connection.pubsub.createNode(
    Control.admin_jid,
    Control.pubsub_server,
    Config.PUBSUB_NODE,
    {},
    Control.on_create_node
  );
});

$(document).bind('disconnected', function () {
  Control.log('Disconnected, goodbye');
  Control.feedback('Disconnected', '#dd0000');
});

