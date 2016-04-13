  var scriptPackage=function(){};
 scriptPackage.init=function(http){
	  var server=http.createServer(function(request, response) {
		  var filename=request.url;
			  filename=getHaxealCSDirectory()+filename;
		   
			  fs.readFile(filename,"binary",function(err, file) {
					if(err) {
						response.writeHead(200, {"Content-Type": "text/plain"});
						response.write(err + "\n");
						response.end();
						return;
					}
				  
					response.writeHead(200,{"Content-Type":mime.lookup(filename)});
					response.write(file, "binary");
					response.end();
				});
		});
	
	server.listen( 80, "0.0.0.0", function() {
		console.log(' HTTP Server is listening on port '+80);
	});
	return server;
 }
 return scriptPackage;
