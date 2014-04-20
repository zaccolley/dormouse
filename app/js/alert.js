function alertMessage(message, type){

	var alert = document.querySelector('.alert');
	var alertMessage = alert.querySelector('.alert__message');

	alertMessage.innerHTML = message;

	if(!alert.classList.contains('alert--show')){
		alert.classList.add('alert--show');
	}

	if(type === 'info' || type === 'error' || type === 'warning' || type === 'success'){
		alert.classList.add('alert--'+type);
	}else{
		alert.classList.remove('alert--error');
		alert.classList.remove('alert--warning');
		alert.classList.remove('alert--info');
		alert.classList.remove('alert--success');
	}

	if(alert.classList.contains('alert--show')){
		setTimeout(function(){ alert.classList.remove('alert--show'); }, 5000);
	}

}
