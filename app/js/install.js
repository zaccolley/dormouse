function installDb(){
	alertMessage("Creating database...", "info");

	ajax({ url: dormouse.url+'/createdb.php' }, function(data){
		setTimeout(function(){
			alertMessage("Created database!", "success");
		}, 1000);
	});	
}

function initSubmitButtonListener(){
	var submitButton = document.querySelector('.install__form button');

	if(submitButton){

		submitButton.addEventListener('click', function(e){

			// create config file using ajax
			// reload page

			// e.preventDefault();
		});

	}

}
