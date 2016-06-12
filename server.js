//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var http = require("http");
var common = require("./common");


//-----------------------------------------------------------------------------
// Attributes
//-----------------------------------------------------------------------------
var logger = common.Logger();


//-----------------------------------------------------------------------------
// Public functions
//-----------------------------------------------------------------------------
function run(router, port = 8080) {
    http.createServer(function(request, response) {
        router.route(new common.Request(request), response);
    }).listen(port);
    router.print_routes();
    logger.info("Server listening in port " + port);
}


//-----------------------------------------------------------------------------
// Exports
//-----------------------------------------------------------------------------
exports.run = run;