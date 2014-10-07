
/**
 * Module dependencies
 */

var nano = require('nanomsg')
  , EventEmitter = require('events').EventEmitter

/**
 * `Server' constructor
 *
 * @api public
 */

module.exports = Server;
function Server () {
  if (!(this instanceof Server)) {
    return new Server();
  }

  var self = this;
  this.socket = nano.socket('pull');
  this.socket.on('message', function (buf) {
    self.emit('message', buf);
  });
}

// inherit from `EventEmitter'
Server.prototype = Object.create(EventEmitter.prototype, {
  constructor: {value: Server}
});

/**
 * Listens for incoming messages on a
 * given port
 *
 * @api public
 * @param {Number} port
 */

Server.prototype.listen = function (port) {
  var addr = 'tcp://127.0.0.1:'+ port;
  this.socket.bind(addr);
  return this;
};

