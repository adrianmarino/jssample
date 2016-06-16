var assert = require('chai').assert;
require("../../../lib/extensions/core")

describe('Date', function() {
  describe('#iso()', function () {
    context("when create a date as 1981-09-22 06:05:00", function () {
      var date = new Date("1981-09-22 06:05:00");

      it('returns a iso string representation', function () {
        assert.equal("1981-09-22 06:05:00", date.iso());
      });
    });
  });
});
