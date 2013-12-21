// ajax goes here lol
(function(){
	iconSwap();
	displayOptionInit();
})()


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

function displayOptionInit(){
	var displayOptions = document.querySelectorAll('.bits label');
	console.log(displayOptions);

	// hide the first display option
	displayOptions[0].style.display = 'none';

	for(var i in displayOptions){
		var displayOption = displayOptions[i];

		if(displayOption.hasOwnProperty('innerHTML')){
			displayOption.addEventListener('click', displayOptionToggle, false);
		}
	}

}

function displayOptionToggle(){
	var displayOptions = document.querySelectorAll('.bits label');
	
	displayOptions[0].style.display = '';
	displayOptions[1].style.display = '';

	this.style.display = 'none';
}
	