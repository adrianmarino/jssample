//-----------------------------------------------------------------------------
// Public functions
//-----------------------------------------------------------------------------
function defineMethod(constructor, methodName, block) {
    if(constructor.prototype[methodName]) throw new MethodDefinitionError(methodName, constructor);
    constructor.prototype[methodName] = block;
}


//-----------------------------------------------------------------------------
// Object extensions
//-----------------------------------------------------------------------------
defineMethod(String, "repl", function() {
    var args = arguments, i = 0;
    return this.replace(/%s/g, function() { return args[i++]; });
});

defineMethod(Date, "iso", function() { 
    function pad(n) {return n<10 ? '0'+n : n}
    return "".concat(this.getFullYear(), '-', pad(this.getMonth() + 1), '-', pad(this.getDate()), ' ',
         pad(this.getHours()), ':', pad(this.getMinutes()), ':', pad(this.getSeconds()));
});


//-----------------------------------------------------------------------------
// Private functions
//-----------------------------------------------------------------------------
function MethodDefinitionError(methodName, obj) {
    return { name: "MethodDefinitionError", message: "'" + obj.name + "' already has '" + methodName + "' method!" };
}


//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.defineMethod = defineMethod;
