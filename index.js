var ipaddress = '0.0.0.0';
var port      = 80;
fs      = require('fs');

console.log(__dirname);
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
var WebSocketServer = require('ws').Server;
var http = require('http');
var mime = require('mime');
process.tempInclude=function(fileName){//Make sure the files are in SS directory inside repo folder;
	//check and see if this can introduce memory leak. 
	var fileNameWithoutExt=fileName.slice(0,-3);
	if(global[fileNameWithoutExt])delete global[fileName];//no need to keep previous script for the next script.
	return global[fileNameWithoutExt]=Function(fs.readFileSync(__dirname+'/ss/'+fileName)+'')();	
}
process.include=function(fileName){//Make sure the files are in SS directory inside repo folder;
	var fileNameWithoutExt=fileName.slice(0,-3);
	if(global[fileNameWithoutExt])return global[fileNameWithoutExt];
	return global[fileNameWithoutExt]=Function(fs.readFileSync(__dirname+'/ss/'+fileName)+'')();	
}


var server = http.createServer(function(request, response) {
    //response.write((new Date()) + ' Received request for ' + request.url);
	//response.writeHead(200, {'Content-Type': 'text/html'});

		  var filename=request.url;//__dirname+request.url;
	  filename=__dirname+"/cs/"+filename;
   
	  fs.readFile(filename,"binary",function(err, file) {
	      
			if(err) {
				response.writeHead(200, {"Content-Type": "text/plain"});
				response.end("bug!\n");
				response.write(err + "\n");
				response.end();
				return;
			}
		  
			response.writeHead(200,{"Content-Type":mime.lookup(filename)});
			response.write(file, "binary"); // this may not work for all other like images,pdf, video, etc ;s. I may need to fix this later but for now we'll use it for html mainly.
			response.end();
		});
});

server.listen( port, ipaddress, function() {
    console.log(ipaddress + ' HTTP Server is listening on port '+port);
});
