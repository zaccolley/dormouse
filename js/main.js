(function(){
	iconSwap();
	displayOptionInit();
	basketInit();

	var catList = document.querySelector('.categories');
	ajax({ url: 'data/categories.json' }, function(data){
		data.categories.forEach(function(category){
			catList.innerHTML += "<li><a href='#"+category.toLowerCase()+"'>"+category+"</a></li>";
		});

	});

	var itemList = document.querySelector('.items');
	ajax({ url: 'data/items.json' }, function(data){

		for(var i in data.items){
			var item = data.items[i];
			
			itemList.innerHTML +=  
			"<li class='item-grid'>" +
				"<section style='background-image: url("+item.image+");'>" +
					"<div class='details'>" +
						"<h1 class='details-title'>" +
							"<a href='#"+item.title+"'' title='More details on "+item.title+"?''>"+item.title+"</a>" +
						"</h1>" +
						"<p class='details-desc'>"+item.desc+"</p>" +
						"<p class='details-price'>" +
							"<a href='#"+item.title+"'' title='More details on "+item.title+"?''>"+item.price+"</a>" +
						"</p>" +
					"</div>" +
				"</section>" +
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

	var basket = document.querySelector('.basket');
	basket.style.height = '0';
}

function basketToggle(){
	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	if(basket.style.height === '0px'){
		basket.style.height = '100px';
		checkoutLink.className = 'checkout checkout-alt';
	}else{
		checkoutLink.className = 'checkout';
		basket.style.height = '0';
	}
}

// for setting up the buttons for switching the display of the items
function displayOptionInit(){
	var displayOptions = document.querySelectorAll('.display-option');

	// hide the first display option
	displayOptions[0].style.display = 'none';

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
	var displayOptionType = 'grid';

	for(var k in displayOptions){
		var displayOption = displayOptions[k];

		if(displayOption.hasOwnProperty('innerHTML')){
			if(displayOption.style.display === ''){
				displayOption.style.display = 'none';
				displayOptionType = 'list';
			}else{
				displayOptionType = 'grid';
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
	