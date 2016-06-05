var http = require("http");

http.createServer(function(require, response) {
    response.writeHead(200, { "Content-type": "text/html" });
    response.write("Hello World");
    response.end();
}).listen(9090);