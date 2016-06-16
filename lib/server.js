//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var http = require("http");
var common = require("./common");
var net = require("./net");
var Request = net.Request;
var Response = net.Response;


//-----------------------------------------------------------------------------
// Attributes
//-----------------------------------------------------------------------------
var logger = new common.Logger();


//-----------------------------------------------------------------------------
// Public functions
//-----------------------------------------------------------------------------
function run(router, port = 8080) {
    http.createServer(function(request, response) {
        router.route(new Request(request), new Response(response));
    }).listen(port);
    router.print_routes();
    logger.info("Server listening in port " + port);
}


//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.run = run;
