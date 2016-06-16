var assert  = require('chai').assert;
var core    = require("../../../lib/extensions/core")

describe('Core', function() {
  describe('#defineMethod()', function () {
    context("when invoked getName method added with defineMethod", function() {
      function User(name) { this.name = name; };
      var user = new User("Adrian");

      it('returns Adrian', function () {
        core.defineMethod(User, "getName", function() { return this.name; }); 
        assert.equal("Adrian", user.getName());
      });
    });
  });
});