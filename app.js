//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var server = require("./server");
var router = require("./router");
var common = require("./common");
var process = require("child_process");


//-----------------------------------------------------------------------------
// Attributes
//-----------------------------------------------------------------------------
var logger = common.Logger();


//-----------------------------------------------------------------------------
// Routes
//-----------------------------------------------------------------------------
router.handle("get", "/find", function(request, response) {
    process.exec("find /", { timeout: 50000, maxBuffer: 20000*1024 }, function (error, stdout, stderr) {
        response.write(stdout);
        response.end();
    });
});

router.handle("get", "/tree", function(request, response) {
    process.exec("tree", function (error, stdout, stderr) {
        response.write(stdout);
        response.end();
    });
});

router.handle("get", "/sleep", function(request, response) {
    var timeout = request.param("timeout") || 500;
    logger.info("Start sleep by %s millis...", timeout);
    response.write("Timeout ends!");
    setInterval(function() { response.end(); }, timeout);
});


//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------
server.run(router);
common.exist_message("Bye Bye!");
