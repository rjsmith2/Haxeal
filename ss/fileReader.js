var scriptPackage=function(){};
//begin your script here
scriptPackage.readAndEcho=function(json,wsObject){
	var fileName=json.fileName;
	fs.readFile(getHaxealCSDirectory()+fileName, 'utf8',
			function(err,data){
				if(err)return 0;
				this.echo(data);
			}.bind(wsObject);
	);
}
//end your script here
return scriptPackage;
