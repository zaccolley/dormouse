// make an alert box
function alertMessage(message, type){

	var alert = document.querySelector('.alert');
	var alertMessage = alert.querySelector('.alert__message');

	// add the message to the alert box
	alertMessage.innerHTML = message;

	// show the alert box
	if(!alert.classList.contains('alert--show')){
		alert.classList.add('alert--show');
	}

	// reset
	alert.classList.remove('alert--error');
	alert.classList.remove('alert--warning');
	alert.classList.remove('alert--info');
	alert.classList.remove('alert--success');

	// apply alert type
	if(type === 'info' || type === 'error' || type === 'warning' || type === 'success'){
		alert.classList.add('alert--'+type);
	}

	// hide the alert box again
	if(alert.classList.contains('alert--show')){
		setTimeout(function(){ alert.classList.remove('alert--show'); }, 1500);
	}

}
