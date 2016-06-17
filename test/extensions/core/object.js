//-----------------------------------------------------------------------------
// Require
//-----------------------------------------------------------------------------
var expect  = require('chai').expect;
var let     = require("../../../lib/extensions/mocha").let;
var MethodDefinitionError    = require("../../../lib/extensions/core").MethodDefinitionError;


//-----------------------------------------------------------------------------
// Test
//-----------------------------------------------------------------------------
describe("Core", function() {
  describe("#defineMethod()", function () {
    function User(name) { this.name = name; };

    before(function() { 
      User.undefineMethod("getName")
          .defineMethod("getName", function() { return this.name; }); 
    });
    
    context("when invoked getName method added with defineMethod", function() {
      var user = let(function() { return new User("Adrian"); });

      it("returns Adrian", function () {
        expect(user().getName()).to.equal("Adrian");
      });
    });

    it("throws an MethodDefinitionError when try to define an existent method", function () {        
      expect(function() { User.defineMethod("getName", function() {}); })
          .to.throw(MethodDefinitionError.name);
    });

    it("delete object method when undefine an existent method", function() {
      expect(function() { User.defineMethod("getName", function() {}); })
          .to.throw(MethodDefinitionError.name);
    });
  });
});