//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var server  = require("./lib/server");
var routers = require("./lib/router");
var common  = require("./lib/common");
var view    = require("./lib/view");
var process = require("child_process");


//-----------------------------------------------------------------------------
// Attributes
//-----------------------------------------------------------------------------
var logger = common.Logger();


//-----------------------------------------------------------------------------
// Routes
//-----------------------------------------------------------------------------
routers.add("get", "/find", function(request, response) {
    process.exec("find /", { timeout: 50000, maxBuffer: 20000*1024 }, function (error, stdout, stderr) {
        response.write(stdout);
        response.end();
    });
});

routers.add("get", "/tree", function(request, response) {
    process.exec("tree", function (error, stdout, stderr) {
        response.write(stdout);
        response.end();
    });
});

routers.add("get", "/sleep", function(request, response) {
    var timeout = request.param("timeout") || 500;
    logger.info("Start sleep by %s millis...", timeout);
    response.write("Timeout ends!");
    setInterval(function() { response.end(); }, timeout);
});

routers.add("get", "/index", function(request, response) {
    response.write(view.get("index"));
    response.end();
});

routers.add("post", "/note", function(request, response) {
    request.get_fields("utf8", function(fields) {
        response.writeJson(fields);
        logger.info(JSON.stringify(fields));
        response.end();
    });
});

//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------
server.executeUsing(routers);
common.exist_message("Bye Bye!");
