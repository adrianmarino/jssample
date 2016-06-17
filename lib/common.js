//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var process = require("process");
require("../lib/extensions/core")

//-----------------------------------------------------------------------------
// Public functions
//-----------------------------------------------------------------------------
function Map(hash) {
    return {
        content: hash || {},
        methods: function() { return ["keys", "isEmpty", "forEach", "filter", "reject"]; },
        keys: function() {
            var that = this;
            return Object.keys(this.content).filter(function(key) { 
                return that.methods().indexOf(key) === -1;
            });
        },
        isEmpty: function() { return this.keys().length === 0; },
        forEach: function(each) {
            var that = this;
            this.keys().forEach(function(key) { each(key, that.get(key)); }); 
        },
        filter: function(filter) {
            var map = new Map();
            this.forEach(function(key, value) { if(filter(key, value)) { map.put(key, value); }});
            return map;
        },
        reject: function(reject) {
            return this.filter(function(key, value) { return !reject(key, value); }); 
        },
        put: function(key, value) { this.content[key] = value; },
        get: function(key) { return this.content[key]; }
    }
}

function Logger() {
    return {
        log:    function(message, args) {
            var args = [].slice.call(arguments, 1);
            var date = new Date().iso();
            console.log("%s - %s".repl(date, message.repl(args)));
        },
        info:   function(message, args) { this.log("INFO - %s".repl(message), args); },
        debug:  function(message, args) { this.log("DEBUG - %s".repl(message), args); },
        warn:   function(message, args) { this.log("WARN - %s".repl(message), args); },
        error:  function(message, args) { this.log("INFO - %s".repl(message), args); }
    };
}

function exist_message(message) {
    process.on('SIGINT', function() {
        new Logger().info(message);
        process.exit();
    });
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.Map = Map;
exports.Logger = Logger;
exports.exist_message = exist_message;
