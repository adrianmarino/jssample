//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var url = require("url");


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

function Request(request) {
    return {
        "request"   : request,
        "method"    : function() { return this.request.method; },
        "uri"       : function() { return url.parse(this.request.url).pathname; },
        "params"    : function() {
            var parts = url.parse(this.request.url, true);
            return parts.query;
        },
        "toString"  : function() { return this.method() + " " + this.uri(); }
    };
}

function Logger() {
    return {
        "promp" : function()        { return date_to_string(new Date()); },
        "log"   : function(message) { console.log(this.promp() + " - " + message); },
        "info"  : function(message) { this.log("INFO - "  + message); },
        "debug" : function(message) { this.log("DEBUG - " + message); },
        "warn"  : function(message) { this.log("WARN - "  + message); },
        "error" : function(message) { this.log("ERROR - " + message); }
    };
}

function date_to_string(date) { return date.toISOString().replace(/T/, ' ').replace(/\..+/, ''); }


//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.Request = Request;
exports.Map = Map;
exports.Logger = Logger;
exports.date_to_string = date_to_string;
