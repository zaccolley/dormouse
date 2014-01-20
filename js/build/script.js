// ajax: jackie chan hax

/*

	inputOptions

		theres some options you can input

		{
			request: GET, POST, HEAD etc..
			url: the URL to request (required)
			async: is it asynchronous?
			dataType: what type is the data sent back
			data: any data to be sent
			callbacks: functions to callback (load, progress)
			debug: shows console.logs
		}

		see below for defaults set

	callback

		the function to callback on

*/

var ajax = function(inputOptions, callback){

	var xhr,
	options = {
		// defaults
		request: 'GET',
		url: null,
		async: true,
		dataType: 'json',
		data: null,
		debug: false
	}

	// sort through input object

	for(var option in inputOptions){
		var optionValue = inputOptions[option];
	
		switch(option){
			case 'request': options.request = optionValue; break;
			case 'url': options.url = optionValue; break;
			case 'async': options.async = optionValue; break;
			case 'dataType': options.dataType = optionValue; break;
			case 'data': options.data = optionValue; break;
			case 'debug': options.debug = optionValue; break;
			default: options.debug && console.log('Invalid option supplied');
		}

	}

	if(!options.url){
		options.debug && console.log('ajax() requires a URL');
		return false;
	}

	if(window.XMLHttpRequest){ // Mozilla, Safari, ...
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject){ // IE
		xhr = new ActiveXObject("Msxml2.XMLHTTP");
	}

	if(!xhr){
		options.debug && console.log('XMLHttpRequest could not be created. :¬(');
		return false;
	}else{

		options.debug && console.log('XMLHttpRequest created');

		xhr.open(options.request, options.url, options.async);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

		if(options.dataType){
			xhr.responseType = options.dataType;
		}

		xhr.send(options.data);
		options.debug && console.log('Data sent: ', options.data);

		xhr.addEventListener("readystatechange", function(){

			var states = ['Uninitialised', 'Loading',
						'Loaded', 'Interactive', 'Complete'];

			options.debug && console.log('State:', states[xhr.readyState], xhr.readyState);

			// OK and ready
			if(xhr.readyState == 4){
				options.debug && console.log('Status:', xhr.status, '('+xhr.statusText+')', 'at "'+options.url+'"');     
				if(xhr.status == 200){
					options.debug && console.log('Success');
					callback(xhr.response);
				}
			}

		});

	}

};

(function(){
	iconSwap();
	displayOptionInit();
	basketInit();

	var catList = document.querySelector('.categories');
	ajax({ url: 'data/categories.php' }, function(data){
		data.categories.forEach(function(category){
			catList.innerHTML += "<li><a href='#"+category.toLowerCase()+"'>"+category+"</a></li>";
		});
	});

	var itemList = document.querySelector('.items');
	ajax({ url: 'data/items.php' }, function(data){

		for(var i in data.items){
			var item = data.items[i];

			itemList.innerHTML +=  
			"<li class='item-list'>" +
				"<img src='images/build/"+item.id+".jpg' alt='Image of "+item.name+"'>" +
				"<div class='details'>" +
					"<h1 class='details-title'>" +
						"<a href='#"+item.name+"' title='More details on "+item.name+"?''>"+item.name+"</a>" +
					"</h1>" +
					"<p class='details-desc'>"+item.desc+"</p>" +
					"<p class='details-price'>" +
						"<a href='#"+item.name+"'' title='More details on "+item.name+"?''>"+item.price+"</a>" +
					"</p>" +
				"</div>" +
			"</li>";

		}

	});

	var basket = document.querySelector('.basket-items');
	ajax({ url: 'data/basket.json' }, function(data){

		for(var i in data.items){
			var item = data.items[i];

			basket.innerHTML +=  
			"<li class='item-list'>" +
				"<img src='images/build/"+item.id+".jpg' alt='Image of "+item.name+"'>" +
				"<div class='details'>" +
					"<h1 class='details-title'>" +
						"<a href='#"+item.name+"' title='More details on "+item.name+"?''>"+item.name+"</a>" +
					"</h1>" +
					"<p class='details-desc'>"+item.desc+"</p>" +
					"<p class='details-price'>" +
						"<a href='#"+item.name+"'' title='More details on "+item.name+"?''>"+item.price+"</a>" +
					"</p>" +
				"</div>" +
			"</li>";

		}

	});

})();

// to swap any text with dirty icons
function iconSwap(){

	// get list of icons
	var icons = document.querySelectorAll('.icon-swap');
	// list of icons to swap out the text with
	var iconSwapLookup = {
		'Search': 'search',
		'Grid': 'th-large',
		'List': 'th-list',
		'Checkout': 'shopping-cart'
	};

	for(var i in icons){		
		var icon = icons[i];

		// if the object has innerHTML
		if(icon.hasOwnProperty('innerHTML')){

			// swap the text with the icon name
			var className = iconSwapLookup[icon.innerHTML];
			icon.innerHTML = '<i class="fa fa-'+className+'"></i>';

			// remove the class showing it was for swapping
			icon.classList.remove('icon-swap');

		}

	}

}

function basketInit(){
	var checkoutLink = document.querySelector('.checkout');
	checkoutLink.addEventListener('click', basketToggle, false);
}

function basketToggle(){
	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	if(basket.className.indexOf('closed') != -1){
		checkoutLink.className = 'checkout checkout-alt';
		basket.className = 'basket';
	}else{
		checkoutLink.className = 'checkout';
		basket.className = 'basket basket-closed';
	}
}

// for setting up the buttons for switching the display of the items
function displayOptionInit(){
	var displayOptions = document.querySelectorAll('.display-option');

	// hide the first display option
	document.getElementById('list-display-option-label').style.display = 'none';

	for(var j in displayOptions){
		var displayOption = displayOptions[j];

		if(displayOption.hasOwnProperty('innerHTML')){
			displayOption.addEventListener('click', displayOptionToggle, false);
		}
	}

}

// toggle the display options buttons
function displayOptionToggle(){
	var displayOptions = document.querySelectorAll('.display-option');
	var items = document.querySelectorAll('.items li');
	var displayOptionType = 'list';

	for(var k in displayOptions){
		var displayOption = displayOptions[k];

		if(displayOption.hasOwnProperty('innerHTML')){
			if(displayOption.style.display === ''){
				displayOption.style.display = 'none';
				displayOptionType = 'grid';
			}else{
				displayOptionType = 'list';
				displayOption.style.display = '';
			}
		}
	}

	for(var l in items){
		var item = items[l];

		if(item.hasOwnProperty('innerHTML')){
			item.className = 'item-'+displayOptionType;
		}
	}

}

function changeCheckoutItemAmount(amount){
	var checkoutItemAmount = document.querySelector('.checkout-item-amount');

	if(amount > 0){
		checkoutItemAmount.innerHTML = amount;
		checkoutItemAmount.title = "You have "+amount+" items, nice! :¬)";
	}else{
		checkoutItemAmount.innerHTML = 0;
		checkoutItemAmount.title = "There's nothing here!";
	}

	if(amount >= 1000){
		checkoutItemAmount.innerHTML = '999+';
		checkoutItemAmount.title = "So many items! You have "+amount+" items. :¬O";
	}
}
	