Function.prototype.defineMethod = function(methodName, block) { 
    if (this.prototype[methodName])
        throw new MethodDefinitionError(methodName, this);
    this.prototype[methodName] = block;
    return this;
}

Function.prototype.undefineMethod = function(methodName) {
    this.prototype[methodName] = null;
    return this;
}

String.defineMethod("repl", function() {
    var args = arguments, i = 0;
    return this.replace(/%s/g, function() { return args[i++]; });
});

Date.defineMethod("iso", function() { 
    function pad(n) { return n < 10 ? '0' + n : n }
    return "%s-%s-%s %s:%s:%s".repl(this.getFullYear(), pad(this.getMonth() + 1), pad(this.getDate()),
         pad(this.getHours()), pad(this.getMinutes()), pad(this.getSeconds()));
});

exports.MethodDefinitionError = function MethodDefinitionError(methodName, receiver) {
    return {
        name: "MethodDefinitionError",
        message: "'%s' already has '%s' method!".repl(receiver.name, methodName)
    };
}
