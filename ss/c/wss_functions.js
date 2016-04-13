 var scriptPackage=function(){};
 scriptPackage.init=function(wss){
	  wss.on('connection', function(ws) {
		ws.ec=function(msg,id){
			var d={"data":msg};
			if(id)d["id"]=id;
			this.send(JSON.stringify(d));
			
		};
	  ws.on('message', function(message) {
			
			var json=JSON.parse(message);
			//echo(message);
			console.log(json);
			var jsonIDCaller=json["idc"]||0;
			this.echo=function(msg){this.ec(msg,jsonIDCaller);};//might lead to mixed jsonIDCaller if operated concurrently in both sync/async mode. Check me.
			process.tempInclude("c/wss_"+json["command"]+".js").fromClient(json.data,this);
		   
		
		//var json=JSON.stringify({"evalData":(1,eval)(message)});
	  
	  //	ws.send(new Function("return "+message)().toString());//will be sent as binary btw
	  });
	});
	console.log("WSS initilizated");
 }
 return scriptPackage;
