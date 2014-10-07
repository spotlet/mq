
/**
 * Module dependencies
 */

var amp = require('amp')

/**
 * Creates a command in realm with arguments
 *
 * @api public
 * @param {String} realm
 * @param {Array} args - optional
 */

module.exports = Command;
function Command (realm, args) {
  if (!(this instanceof Command)) {
    return new Command(realm, args);
  }

  this.realm = realm;
  this.args = args || [];
  this.nonce = Date.now().toString('16');
}

/**
 * Decode buffer into command
 *
 * @api public
 * @static
 * @param {Buffer} buffer
 */

Command.decode = function parse (buffer) {
  var msg = amp.decode(buffer);
  if (3 != msg.length) {
    return null;
  }

  // read
  var nonce = String(msg.shift());
  var realm = String(msg.shift());
  var args = msg.shift();

  // parse
  try { args = JSON.parse(args); }
  catch (e) { return null; }

  // create
  var cmd = Command(realm, args);
  cmd.nonce = nonce;
  return cmd;
};

/**
 * Encodes a given command
 *
 * @api public
 * @static
 * @param {Command|Object} cmd
 */

Command.encode = function (cmd) {
  var tmp = Command(cmd.realm, cmd.args);
  tmp.nonce = cmd.nonce || tmp.nonce;
  return tmp.encode();
};

/**
 * Encodes `Command' instance
 *
 * @api public
 */

Command.prototype.encode = function () {
  var msg = [];
  msg.push(Buffer(this.nonce));
  msg.push(Buffer(this.realm));
  msg.push(Buffer(JSON.stringify(this.args)));
  return amp.encode(msg);
};

