//-----------------------------------------------------------------------------
// Requires
//-----------------------------------------------------------------------------
var server = require("./server");
var router = require("./router");
var common = require("./common");
var exec = require("child_process").exec;


//-----------------------------------------------------------------------------
// Routes
//-----------------------------------------------------------------------------
router.handle("get", "/hello", function(request, response) {
    response.write("Hello!");
    response.end();
});

router.handle("get", "/ls", function(request, response) {
  exec("tree", function (error, stdout, stderr) {
    response.write(stdout);
    response.end();
  });
});


//-----------------------------------------------------------------------------
// Main
//-----------------------------------------------------------------------------
server.run(router);