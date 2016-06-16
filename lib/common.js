//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var process = require("process");
require("../lib/extensions/core")

//-----------------------------------------------------------------------------
// Public functions
//-----------------------------------------------------------------------------
function Map(hash) {
    var methods = ["keys", "isEmpty", "forEach", "filter", "reject"];
    var map = hash || {};

    map["keys"] = function() { return Object.keys(map).filter(function(key) { return methods.indexOf(key) === -1; }); };
    map["isEmpty"] = function() { return map.keys().length === 0; };
    map["forEach"] = function(each) { map.keys().forEach(function(key) { each(key, map[key]); }); };
    map["filter"] = function(filter) {
        var newMap = Map();
        map.forEach(function(key, value) { if(filter(key, value)) { newMap[key] = value; }});
        return newMap;
    };
    map["reject"] = function(reject) {
        return map.filter(function(key, value) { return !reject(key, value); });
    };
    return map;
}

function Logger() {
    return {
        "log"   : function(message, args) {
            var args = [].slice.call(arguments, 1);
            console.log(new Date().iso().concat(" - ", message.repl(args)));
        },
        "info"  : function(message, args) { this.log("INFO - %s".repl(message), args); },
        "debug" : function(message, args) { this.log("DEBUG - %s".repl(message), args); },
        "warn"  : function(message, args) { this.log("WARN - %s".repl(message), args); },
        "error" : function(message, args) { this.log("INFO - %s".repl(message), args); }
    };
}

function exist_message(message) {
    process.on('SIGINT', function() {
        console.log(format("\n%s", message));
        process.exit();
    });
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.Map = Map;
exports.Logger = Logger;
exports.exist_message = exist_message;
