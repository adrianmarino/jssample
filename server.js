var http = require("http");

function start(router, port = 9090) {
    var server = http.createServer(function(require, response) {
        router.route(require, response);
    });

    server.listen(port);
    console.log("...server up!");
}

exports.start = start;