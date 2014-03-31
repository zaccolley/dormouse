// main

(function(){

	dormouse = {	
		title: document.title
	};

	closePopUp();

	initAll();
	updateAll();

	headerHeightFix();
})();

function headerHeightFix(){
	var header = document.querySelector('header');
	var headerSize = header.offsetHeight+'px';
	document.body.style.marginTop = headerSize;
}

function updateAll(){
	updateCategories();
	updateItems();
	updateBasket();
}

function initAll(){
	initDisplayOption();
	initBasket();
	initIconSwap();
	initUpdateItemsListeners();
}

// to swap any text with dirty icons
function initIconSwap(){

	// get list of icons
	var icons = document.querySelectorAll('.icon-swap');
	// list of icons to swap out the text with
	var iconSwapLookup = {
		'Search': 'search',
		'Grid': 'th-large',
		'List': 'th-list',
		'Basket': 'shopping-cart'
	};

	for(var i in icons){		
		var icon = icons[i];

		// if the object has innerHTML
		if(icon.hasOwnProperty('innerHTML')){

			// swap the text with the icon name
			var className = iconSwapLookup[icon.innerHTML];
			icon.innerHTML = '<i class="fa fa-'+className+'"></i> '+icon.innerHTML;

			// remove the class showing it was for swapping
			icon.classList.remove('icon-swap');

		}

	}

}

// for setting up the buttons for switching the display of the items
function initDisplayOption(){
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
	