var ipaddress = '0.0.0.0';
var port      = 80;
fs      = require('fs');

console.log(__dirname);
___dirname=__dirname
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});
echo=function(msg){
	
for(var i in wss.clients){
		wss.clients[i].send(JSON.stringify({"data":msg}));
	}
}
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
tempInclude=process.tempInclude;
include=process.include;


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
	 }
});

server.listen( port, ipaddress, function() {
    console.log(ipaddress + ' HTTP Server is listening on port '+port);
});

wss = new WebSocketServer({
    server: server,
	port: 8000,
    autoAcceptConnections: false
});
wss.username={};
wss.on('connection', function(ws) {
	ws.ec=function(msg,id){
		var d={"data":msg};
		if(id)d["id"]=id;
		this.send(JSON.stringify(d));
		
	};
	ws.targetedUsername={};
  ws.on('message', function(message) {
  		 //ws.send("Server sees this as plain:"+message);
  		 ERROROBJECTforJSON=message;
  	try {//if valid JSON format then
        var json=JSON.parse(message);
        //echo(message);
        var jsonIDCaller=json["idc"]||0;
        this.echo=function(msg){this.ec(msg,jsonIDCaller);};//might lead to mixed jsonIDCaller if operated concurrently in both sync/async mode. Check me.
        switch(json["command"]){
			case "install":tempInclude("install.js").install(this);break;
        }
    } catch (e) {
  });
});



generateUUID=function(){
    var hr = process.hrtime();
    var d= hr[0]*1e9+hr[1]
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
};
console.log("websocket listening");

//UNIX SOCKETING 

var net = require('net');
TCPclients={};
var tcpServer = net.createServer(function(client) {
    // Do something with the client connection
	console.log("unix socket generated");
	client.write("print(\"Connected to Webby Jalopeno Central Service!\");\n\r");
	client.dataMemory={};
	client.on('error', function(err){
		
    });
	client.on("close",function(){
	}.bind(client));
	 client.on('data', function (data) {      
		if(data instanceof Buffer) data=new Buffer(data).toString("utf-8");
		
		  
    }.bind(client));
});
tcpServer.listen(50001);
console.log("unixTCP Socket listening");