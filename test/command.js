
/**
 * Module dependencies
 */

var assert = require('assert')
  , Command = require('../lib/command')

var cmd = Command('mount', ['/foo/bar/biz']);

assert(cmd);
assert('mount' == cmd.realm);
assert(1 == cmd.args.length);
assert(cmd.nonce);

var enc = cmd.encode();
assert(enc instanceof Buffer);

var dec = Command.decode(enc);
assert(dec);
assert(dec.nonce == cmd.nonce);
assert(dec.realm == cmd.realm);
assert(dec.args.length == cmd.args.length);

