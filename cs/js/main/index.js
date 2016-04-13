var currentVersion=1;
wsSocket=function(){};
wsSocket.socketer=null;
doFunction={};
var socketerCounter=0;
wsSocket.socketer=function(){
    var socket = new WebSocket("ws://" + location.host + ":8000");
    socket.wsSocket=this;
    socket.onopen=function(){
    }
    socket.onclose=function(){
	   	setTimeout(function(){
			socket=wsSocket.socketer();
		},500);
    }
    socket.onmessage=function(eve){
    	var json=JSON.parse(eve.data);
    	if(json.id)this.arrFunct[json.id](json["data"]);
    	else if(doFunction[json.command])doFunction[json.command](json);
     }
    socket.onerror=function(eve){
    	console.log("socket error main");
    }
    socket.arrFunct=[];
	socket.sendListen=function(data,callBack){
		data["idc"]=++socketerCounter;
		this.arrFunct[socketerCounter]=callBack;
		this.send(JSON.stringify(data));
	}
    wsSocket.socket=socket;
    
    return socket;
}

socket=wsSocket.socketer();
function newScripter(url,cachable){
	
	//dont use .onload, it causes  quirky behaviors among each browser. use .onloader instead
	var newScript=document.createElement("script");
	newScript.charset = "utf-8";
	newScript.async=true;
	if(localStorage["_URL_"+url+("?v="+currentVersion)] && cachable){
		//newScript.text=localStorage["_URL_"+url+("?v="+currentVersion)];
		eval(localStorage["_URL_"+url+("?v="+currentVersion)]);
		//document.head.appendChild(newScript);
		setTimeout(function(){this.onloader?this.onloader():false;}.bind(newScript),50);
		
	}
	else{
		
		if(socket.readyState == 1){
			console.log(4321,url);
			var getFile={command:"requestFileContent",
				data:{
					fileName:url,
				}			   
			};
			socket.sendListen(getFile,function(data){
				console.log(1,this[2]);
				this[1].text=data;
				eval(data);
				//document.head.appendChild(this[1]);
				if(this[0])
						localStorage["_URL_"+this[2]+("?v="+currentVersion)]=data;
				setTimeout(function(){this.onloader?this.onloader():false;}.bind(this[1]),150);
			}.bind([cachable,newScript,url]));
			return newScript;
		}else{
			console.log(1234,url);
			var xhr = new XMLHttpRequest();
			xhr.s=newScript;
			xhr.doCaching=cachable;
			xhr.urlDO=url;
			xhr.onreadystatechange = function () {
			
				if (this.readyState == 4) {
				console.log(2,this.urlDO);
					this.s.text=this.response;	
					eval(this.response);
					//document.head.appendChild(this.s);					
					this.s.onloader?this.s.onloader(this.response):false;
					if(this.doCaching)
						localStorage["_URL_"+this.urlDO+("?v="+currentVersion)]=this.responseText;
				}
			};
			xhr.open("GET", url, true);
			xhr.send();
		}
	}
	return newScript;
}
newScripter("js/main/fetching.js",false).onloader=function(){
	newScripter("js/main/workerController.js",false);
};



/*newScripter("apiMain.js",false).onload=function(){
		loadingimgCtx.fillText("apiMain.js +",27,40);
};*/