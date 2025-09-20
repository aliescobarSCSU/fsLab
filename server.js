const http = require('http');
const fs = require('fs');
const url = require('url');
//call back function
serveStatic = function (req, res) {
	let fileName = '.' + url.parse(req.url).pathname;
	fs.readFile(fileName, function(err, data) { 
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.write("404: File not found");
	}else{
	//detect file type
		let contentType = 'text/plain';
		if (fileName.endsWith('.jpg')) {
			contentType = 'image/jpg';
        	}
		res.writeHead(200, {'Content-Type': contentType});
	        res.write(data);
	}
	res.end();
});
}
const myserver = http.createServer(serveStatic); //create a server object
myserver.listen(8080, function() {
    console.log("Listening on port 8080");
});
