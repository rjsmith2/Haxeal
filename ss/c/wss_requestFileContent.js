var scriptPackage=function(){};
scriptPackage.fromClient=function(json,wsObject){
	//[UNSECURE FILE SYSTEM] Check for ".." and "/" and root attacks.
	wsObject.echo(fs.readFileSync(getHaxealCSDirectory()+json.fileName,"utf8"));
	
	
}

//Function(fs.readFileSync(__dirname+'/ss/'+fileName)+'')();	
return scriptPackage;