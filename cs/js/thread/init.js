(function(){
	(function (e){"performance"in e||(e.performance={});var o=e.performance;e.performance.now=o.now||o.mozNow||o.msNow||o.oNow||o.webkitNow||function(){return Date.now()-this;}.bind(Date.now())||function(){return(new Date).getTime()}})(self);

	var returnCode=[];
	returnCode[1]=function(json){
		if(json.source)
			var script=newIsolatedScript(json.source,json.name);
			window.open();
	}
	self.addEventListener("message",(function(evt){
		var json=evt.data;
		switch(+json["code"]){
			case 0:break;
			case 1:newIsolatedScript(json.data["script"]);break;
		}
		if(json["returnCode"] && returnCode[+json["returnCode"]]){
			returnCode[+json["returnCode"]](json);
		}
	}));
	
	function newIsolatedScript(script,setAsName){
		var setAsName=setAsName||(1+~Math.random(36).toString(16)+performance.now().toString(36)).replace("-","");
		var appliedPostMessage=function(){
			var args=arguments;
			var obj={};
			obj["data"]=args[0];
			delete args[0];
			obj["Scriptee"]=(this[0]);
			args[1]&&args[1].unshift(args[0]["Scriptee"]);
			args[0]=obj;
			delete obj;
			self.postMessage.apply(null,args);
			//.apply(self.postMessage, ['Script:'+this[0]].concat(arguments));
		}.bind(["f"+setAsName]);
		console.log(setAsName);
		return new Function("postMessage","return (function f"+setAsName+"(){var self=null;"+script+"})()")(appliedPostMessage);
	}
		self.postMessage(performance.now());
		var json={code:1,url:"thread/virtualDOM.js",name:"virtualDOM"};//get script context
		self.postMessage(json);
		
	
})();


