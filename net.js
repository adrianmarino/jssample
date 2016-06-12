//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var url = require("url");
var querystring = require("querystring");


//-----------------------------------------------------------------------------
// Public functions
//-----------------------------------------------------------------------------
function Request(request) {
    return {
        "request"   : request,
        "method"    : function() { return this.request.method; },
        "uri"       : function() { return url.parse(this.request.url).pathname; },
        "params"    : function() { return url.parse(this.request.url, true).query; },
        "param"     : function(name) { return this.params()[name]; },
        "toString"  : function() { return this.method() + " " + this.uri(); },
        "get_fields"    : function(encoding, on_end) {
            this.request.setEncoding(encoding);
            var data = '';
            this.request.addListener("data", function(chunk) { data += chunk });
            this.request.addListener("end", function() { on_end(querystring.parse(data)); });
        }
    };
}

function Response(response) {
    return {
        "response"      : response,
        "end"           : function() { return this.response.end(); },
        "write"         : function(value) { return this.response.write(value); },
        "writeHead"     : function(code, headers) { return this.response.writeHead(code, headers); },
        "writeJson"     : function(hash) {
            this.writeHead(200, { "Content-type": "application/json" });
            this.write(JSON.stringify(hash));
        }
    };
};

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.Request = Request;
exports.Response = Response;