(function(  objToExtend ){
	console.log("initilizing Children");
	var inRenderingContext=!(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)|0;
	var canRunWorkers=(inRenderingContext||true) && (window.Worker || (console.log("Web worker is not supported") && false));
	
	

	canRunWorkers &&
	(objToExtend["threads"]=[]) &&
	(objToExtend["spawnToThreadAsIsolatedScript"]=function(threadID,script,optionalFunctionName){
		var submittion={code:1,data:{script:script,functionName:optionalFunctionName}};
		objToExtend["threads"][threadID].postMessage(submittion);
	
	}) &&
	(objToExtend["initWith"]=function(string){
		if(!string) {
			fetchAt("js/thread/init.js").onloader=function(s){
				var blob = window.URL.createObjectURL(new Blob([s]));
				fetchAt("js/main/workerControllerExtendsWebworkerOnMessaging.js").onloader=function(s){
					objToExtend["threads"].push(new Worker(this));
					var workerID=objToExtend["threads"].length-1;
					s="var _threadID="+workerID+";"+s;//+";var console={};console.log=function(){this.log(["+workerID+"].concat(arguments))}.bind(window.console);"+s;
					objToExtend["threads"][workerID].addEventListener("message",new Function("data",s));//original event codes only.  If you need to add custom event code, attach a new listener to it and insert a function with custom event codes. This will leave original event codes alone.
					console.log("Worker running");
				}.bind(blob);
				
			};
		}
		
	});
	
	return objToExtend;
})(Children={})["initWith"]();


