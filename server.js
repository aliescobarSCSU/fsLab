const http = require('http');
const fs = require('fs');
const url = require('url');

// Callback function
const serveStatic = function (req, res) {
    let fileName = '.' + url.parse(req.url).pathname; 
    fs.readFile(fileName, function(err, data) {
        if (err) {
            // File not found
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write("404: File not found");
        } else {
            // Detect file type
            let contentType = 'text/plain';
            if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
                contentType = 'image/jpeg';
            } else if (fileName.endsWith('.png')) {
                contentType = 'image/png';
            } else if (fileName.endsWith('.html')) {
                contentType = 'text/html';
            }

            res.writeHead(200, {'Content-Type': contentType});
            res.write(data); // send file data
        }
        res.end();
    });
}

const myserver = http.createServer(serveStatic); //create a server object
myserver.listen(8080, function() {
    console.log("Server running: Listening on port 8080");
});
