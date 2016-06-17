var fs = require('fs');

exports.get = function(name) {
    return fs.readFileSync('resources/%s.html'.repl(name), 'utf8');
}
