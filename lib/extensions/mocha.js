/**
 * Get RSpec-style let() in your Mocha/Jasmine specs.
 */
exports.let = function (callback) {
  var value, called = false;
  var memoizer = function() {
    if (called) {
      return value;
    } else {
      called = true;
    }

    return value = callback();
  };

  afterEach(function() {
    value  = undefined;
    called = false;
  });

  return memoizer;
};