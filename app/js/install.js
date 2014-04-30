function installDb(){
	ajax({ url: dormouse.url+'/createdb.php' }, function(data){
		console.log(data);
	});	
}