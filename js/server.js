var http = require('http');
var fs = require('fs');
var port = (process.argv.length >= 3 && !isNaN(process.argv[2])) ? (process.argv[2]) : (3000);

fs.readFile('../index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port);
});
console.log('Server running at http://localhost:'+port+'/');