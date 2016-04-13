fs      = require('fs');
getHaxealCSDirectory=function(){
	return __dirname+"/cs/"+"";
}
getHaxealSSDirectory=function(){
	return __dirname+"/ss/"+"";
}
console.log(__dirname);
process.on('uncaughtException', function (err) {
  console.log( err);
});
var WebSocketServer = require('ws').Server;
var http = require('http');
mime = require('mime');
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


 
var server = process.tempInclude("c/http_functions.js").init(http);
wss = new WebSocketServer({
    server: server,
	port: 8000,
    autoAcceptConnections: false
});
//to-do break this down into components.

process.tempInclude("c/wss_functions.js").init(wss);
