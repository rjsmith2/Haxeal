var currentVersion=1;
var wsSocket=function(){};
wsSocket.socket=null;
doFunction={};
wsSocket.socket=function(){
    var socket = new WebSocket("ws://" + location.host + ":8000");
    socket.wsSocket=this;
    socket.onopen=function(){
    }
    socket.onclose=function(){
	   	setTimeout(function(){
			socket=wsSocket.socket();
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

socket=wsSocket.socket();
function newScripter(url,cachable){
	var newScript=document.createElement("script");
	document.head.appendChild(newScript);
	if(localStorage["_URL_"+url+("?v="+currentVersion)] && cachable){
		newScript.text=localStorage["_URL_"+url+("?v="+currentVersion)];
		setTimeout(function(){this.onload?this.onload():false;}.bind(newScript),50);
	}
	else{
		if(socket.readyState == 1){
			var getFile={command:"requestFileContent",
				data:{
					fileName:"notification",
				}			   
			};
			socket.sendListen();
		}else{
			var xhr = new XMLHttpRequest();
			xhr.s=newScript;
			xhr.doCaching=cachable;
			xhr.urlDO=url;
			xhr.onreadystatechange = function () {
				if (this.readyState == 4) {
					this.s.textContent=this.response;			
					this.s.onload?this.s.onload():false;
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

function loadNewFiles

/*newScripter("apiMain.js",false).onload=function(){
		loadingimgCtx.fillText("apiMain.js +",27,40);
};*/