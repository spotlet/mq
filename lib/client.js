
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

  this.socket = nano.socket('req');
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
 * @param {Buffer} req
 * @param {Function} fn - optional
 */

Client.prototype.send = function (req, fn) {
  if ('function' == typeof fn) {
    this.socket.once('error', function (err) {
      fn(err)
    });

    this.socket.once('message', function (res) {
      fn(null, res);
    });
  }

  this.socket.send(req);
  return this;
};

/**
 * Closes underlying socket
 *
 * @api public
 */

Client.prototype.close = function () {
  this.socket.close();
  return this;
};

