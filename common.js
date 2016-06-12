//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var process = require("process");


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
        "promp" : function()        { return date_to_string(new Date()); },
        "log"   : function(message, args) {
            var args = [].slice.call(arguments, 1);
            console.log(format("%s - %s", this.promp(), format(message, args)));
        },
        "info"  : function(message, args) { this.log(format("INFO - %s",  message), args); },
        "debug" : function(message, args) { this.log(format("DEBUG - %s", message), args); },
        "warn"  : function(message, args) { this.log(format("WARN - %s",  message), args); },
        "error" : function(message, args) { this.log(format("INFO - %s",  message), args); }
    };
}

function date_to_string(date) { return date.toISOString().replace(/T/, ' ').replace(/\..+/, ''); }

function format(str) {
    var args = [].slice.call(arguments, 1), i = 0;
    return str.replace(/%s/g, function() { return args[i++]; });
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
exports.date_to_string = date_to_string;
exports.format = format;
exports.exist_message = exist_message;
