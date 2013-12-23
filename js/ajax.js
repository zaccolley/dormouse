// ajax wow

var ajax = function(inputOptions, callback){

	console.log('AJAX START');

	var xhr,
	options = {
		// defaults
		request: 'GET',
		url: null,
		async: 'true',
		dataType: 'json',
		data: null
	};


	// sort through input object

	for(var option in inputOptions){
		var optionValue = inputOptions[option];
	
		switch(option){
			case 'request': options.request = optionValue; break;
			case 'url': options.url = optionValue; break;
			case 'async': options.async = optionValue; break;
			case 'dataType': options.dataType = optionValue; break;
			case 'data': options.data = optionValue; break;
			default: console.log('Invalid option');
		}

	}

	if(window.XMLHttpRequest){ // Mozilla, Safari, ...
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject){ // IE
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}

	if(!xhr){
		console.log('XMLHttpRequest could not be created. :¬(');
		return false;
	}else{

		console.log('XMLHttpRequest created')

		xhr.open(options.request, options.url, options.async);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xhr.responseType = options.dataType;
		xhr.send(options.data);

		var count = 0;

		xhr.onreadystatechange = function(){

			var states = ['Uninitialised', 'Loading',
						  'Loaded', 'Interactive', 'Complete'];

			console.log('State:', states[xhr.readyState], xhr.readyState);

			// OK and ready
			if(xhr.readyState == 4){
				console.log('Status:', xhr.status, '('+xhr.statusText+')', 'at "'+options.url+'"');		
				if(xhr.status == 200){
					console.log('Success');
					callback(xhr.response);
				}
			}

		}

	}

};
