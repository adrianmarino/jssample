var http = require("http");

var message = "Hello word";

function start(port = 9090) {
    var server = http.createServer(function(require, response) {
        response.writeHead(200, { "Content-type": "text/html" });
        response.write(message);
        console.log(message);
        response.end();
    });
    server.listen(port);
    console.log("...server up!");
}

exports.start = start;