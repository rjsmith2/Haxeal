var jsonFromWorker=data.data;

var threadID=_threadID; //thread containing Scriptee
if(!jsonFromWorker.Scriptee){
	//non-scriptee context from webworker (pre-loading stage, before scripts are running)
	if(!jsonFromWorker.code)return console.info("loaded",jsonFromWorker,"ms");
	switch(jsonFromWorker.code){
		case 0: break;
		case 1:
			fetchAt("js/"+jsonFromWorker.url).onloader=function(s){
			var obj={returnCode:1,source:s,url:this[1].url,name:this[1].name};
			Children["threads"][this[0]].postMessage(obj)
		}.bind([threadID,jsonFromWorker]);break;
	}
	return console.log("Thread "+threadID,jsonFromWorker);
}

var scriptee=jsonFromWorker.Scriptee;//whom that delivered this postMessage to main thread
console.log(threadID,scriptee,jsonFromWorker);
switch(jsonFromWorker.code){
 case 0: break;
}

return;
