
/**
 * Module dependencies
 */

var nano = require('nanomsg')

/**
 * `Client' constructor
 *
 * @api public
 */

module.exports = Client;
function Client () {
  if (!(this instanceof Client)) {
    return new Client();
  }

  this.socket = nano.socket('push');
}

/**
 * Connects to server
 *
 * @api public
 * @param {String} host
 * @param {Number} port
 */

Client.prototype.connect = function (host, port) {
  var addr = 'tcp://'+host+':'+port;
  this.socket.connect(addr);
  return this;
};

/**
 * Sends buffer to server
 *
 * @api public
 * @param {Buffer} buffer
 */

Client.prototype.send = function (buffer) {
  this.socket.send(buffer);
  return this;
};

