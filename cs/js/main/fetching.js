fetchAt=function(url){
	console.log("fetching ",url);
	//dont use .onload, it causes  quirky behaviors among each browser. use .onloader instead
	var newFetching={};	
		if(socket.readyState == 1){
			console.log("Fetching 4321",url);
			var getFile={command:"requestFileContent",
				data:{
					fileName:url,
				}			   
			};
			socket.sendListen(getFile,function(data){
				this[0].text=data;
				//document.head.appendChild(this[1]);
				setTimeout(function(){this.onloader?this.onloader(this.text):false;}.bind(this[0]),150);
			}.bind([newFetching,url]));
			return newFetching;
		}else{
			console.log("Fetching 1234",url);
			var xhr = new XMLHttpRequest();
			xhr.s=newFetching;
			xhr.urlDO=url;
			xhr.onreadystatechange = function () {
				console.log(this.readyState,this.urlDO);
				if (this.readyState == 4) {
					//document.head.appendChild(this.s);				
					this.s.onloader?this.s.onloader(this.response):false;
				}
			};
			xhr.open("GET", url, true);
			xhr.send();
		}
	
	return newFetching;
}