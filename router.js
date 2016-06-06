var url = require("url");

var Handlers = {};

function getUri(request) { return url.parse(request.url).pathname; }

function route(request, response) {
    var uri = getUri(request);
    var handler = Handlers[uri];
    if(handler) {
        console.log("route to " + uri);
        response.writeHead(200, { "Content-type": "text/html" });
        handler(require, response);
    } else {
        response.writeHead(404, { "Content-type": "text/html" });
        response.write(uri + ": Not Found!");  
    }
    response.end();
}

function handler(url, handler) { Handlers[url] = handler; }

exports.route = route;
exports.handler = handler;