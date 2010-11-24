var Control = {
  // being admin credentials
  admin_jid: 'bbc@vm.local',
  admin_pass: 'bbc',
  // end admin credentials

  pubsub_server: 'pubsub.' + Config.XMPP_SERVER,
  connection: null,
  connected: false,
  show_raw: true,
  show_log: true,

  log: function (msg) { 
    if (Control.show_log && window.console) {
      console.log(msg);
    }
  },

  status : function(msg, col) {
    $('#connection_status').html(msg).css('color', col);
  },
  
  raw_input: function (data)  { 
    if (Control.show_raw) {
      Control.log('RECV: ' + data);
    }
  },

  raw_output: function (data) { 
    if (Control.show_raw) {
      Control.log('SENT: ' + data);
    }
  },

  on_send: function (data) {
    Control.log("Data Sent");

    return true;
  },

  publish: function (data) {
    var _d = $build('data', { 'type' : data.type }).t(data.message).toString(); 

    Control.connection.pubsub.publish(
      Control.admin_jid,
      Control.pubsub_server,
      Config.PUBSUB_NODE,
      [_d],
      Control.on_send
    );
  },

  init: function () {
    // send presence
    Control.connection.send($pres());

    // fetch the submit button
    var _p = $('#publish');

    // display the publish button
    _p.fadeIn();

    // setup the onlick event to send data
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

  on_create_node: function (data) {
    Control.status('Connected', '#00FF00');
    Control.init();
  },
}

$(document).ready(function () {
  Control.log('Ready to go...');
  $(document).trigger('connect');
});

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
        Control.status('Connecting... (1 of 2)', '#009900');
      } else if (status == Strophe.Status.CONNFAIL) {
        Control.log('Failed to connect!');
        Control.status('Connection failed', '#FF0000');
      } else if (status == Strophe.Status.DISCONNECTING) {
        Control.log('Disconnecting...');
        Control.status('Disconnecting...', '#CC6600');
      } else if (status == Strophe.Status.DISCONNECTED) {
        Control.log('Disconnected');
        Control.status('Disconnected', '#aa0000');
        $(document).trigger('disconnected');
      } else if (status == Strophe.Status.CONNECTED) {
        $(document).trigger('connected');
      }
    }
  );
});

$(document).bind('connected', function () {
  Control.status('Connecting... (2 of 3)', '#00CC00');

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
  $('#connection_status').html('Disconnected');
  $('#connection_status').css('color', '#dd0000');
});

