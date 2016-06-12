//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var common = require("./common");
var net = require("./net");

//-----------------------------------------------------------------------------
// Attributes
//-----------------------------------------------------------------------------
var logger = common.Logger();
var handlers = common.Map({ 
    "GET": common.Map(), 
    "PUT": common.Map(),
    "POST": common.Map(),
    "DELETE": common.Map()
});


//-----------------------------------------------------------------------------
// Public functions
//-----------------------------------------------------------------------------
function route(request, response) {
    var handler = find_handler(request);
    typeof handler === 'function' ? execute_handler(handler, request, response) : write_handler_not_found_error(request, response);
}

function handle(method, url, handler) {
    handlers[method.toUpperCase()][url] = handler;
}

function print_routes() {
    logger.info("Routes:");
    handlers.reject(hasntUris()).forEach(print_handlers());
}


//-----------------------------------------------------------------------------
// Private functions
//-----------------------------------------------------------------------------
function hasntUris() { return function(method, uris) { return uris.isEmpty() }; }

function print_handlers() {
    return function(method, uris) { uris.forEach(function(uri) { logger.info("   --> " + method + " " + uri); }); };
}

function find_handler(request) {
    var uri = request.uri();
    if(uri == "/") uri += "index";
    return handlers[request.method()][uri];
}

function execute_handler(handler, request, response) {
    logger.info("Request to " + request);
    response.writeHead(200, { "Content-type": "text/html" });
    handler(request, response);
}

function write_handler_not_found_error(request, response) {
    response.writeHead(404, { "Content-type": "text/html" });
    logger.error("Not found handler to " + request);
    response.end();
}

//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.route = route;
exports.handle = handle;
exports.print_routes = print_routes;