var assert = require('chai').assert;
require("../../../lib/extensions/core")

describe('String', function() {
  describe('#repl()', function () {
    context("when create un string with %s", function() {
      var target = "Hello %s, this is a %s";

      it('should set variable in orden in string', function () {
        assert.equal("Hello Adrian, this is a Test", target.repl("Adrian", "Test"));
      });
    });
  });
});