var server = require("./server");
var router = require("./router");

server.start(router);
router.handler("/hello", function(request, response) { 
    response.write("Hello!");
});