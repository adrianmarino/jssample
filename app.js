//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var server = require("./server");
var router = require("./router");
var common = require("./common");
var exec = require("child_process").exec;

//-----------------------------------------------------------------------------
// Attributes
//-----------------------------------------------------------------------------
var logger = common.Logger();

//-----------------------------------------------------------------------------
// Routes
//-----------------------------------------------------------------------------
router.handle("get", "/find", function(request, response) {
    exec("find /", { timeout: 50000, maxBuffer: 20000*1024 }, function (error, stdout, stderr) {
        response.write(stdout);
        response.end();
    });
});

router.handle("get", "/tree", function(request, response) {
    exec("tree", function (error, stdout, stderr) {
        response.write(stdout);
        response.end();
    });
});

router.handle("get", "/sleep", function(request, response) {
    var timeout = request.params()["timeout"];
    logger.info("Start sleep by " + timeout + " millis...");
    setInterval(function(){
        response.write("Timeout ends!");
        response.end();
    }, timeout); 
});


//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------
server.run(router);