
/**
 * Module dependencies
 */

var Server = require('./lib/server')
  , Client = require('./lib/client')
  , Command = require('./lib/command')

/**
 * Expose `Command'
 */

exports.Command = Command;

/**
 * Creates a command server
 *
 * @api public
 * @param {Function} handle
 */

exports.createCommandServer = createCommandServer;
function createCommandServer (handle) {
  var server = Server();
  var send = server.socket.send;
  server.socket.send = function (buffer) {
    if (buffer instanceof Error) {
      buffer = "error: "+buffer.message;
    }

    send.call(this, buffer);
  };
  server.socket.on('message', function (buf) {
    var cmd = Command.decode(buf);
    if (null == cmd) {
      server.emit(
        'error',
        new TypeError("Unknown command encoding for `"+ String(buf) +"'")
      );
    } else {
      if ('function' == typeof handle) {
        handle(cmd);
      }

      server.emit(cmd.realm, cmd);
    }
  });
  return server;
}

/**
 * Creates a command client
 *
 * @api public
 */

exports.createCommandClient = createCommandClient;
function createCommandClient () {
  var client = Client();
  var send = client.send.bind(client);

  client.send = function (cmd, fn) {
    send(Command.encode(cmd), fn);
    return this;
  };

  return client;
}
