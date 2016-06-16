//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var server  = require("./lib/server");
var router  = require("./lib/router");
var common  = require("./lib/common");
var view    = require("./view");
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

router.handle("get", "/index", function(request, response) {
    response.write(view.create_note({action: "/note"}));
    response.end();
});

router.handle("post", "/note", function(request, response) {
    request.get_fields("utf8", function(fields) {
        response.writeJson(fields);
        logger.info(JSON.stringify(fields));
        response.end();
    });
});

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------
server.run(router);
common.exist_message("Bye Bye!");
