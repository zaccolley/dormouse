(function(){

	dormouse = {	
		title: document.title
	};

	iconSwap();

	displayOptionInit();
	basketInit();

	closePopUp();

	updateAll();

	// header height fix
	var header = document.querySelector('header');
	var headerSize = header.offsetHeight+'px';
	document.body.style.marginTop = headerSize;

})();

function updateAll(){
	updateCategories();
	updateItems();
	updateBasket();
}

function addItems(items){
	var preparedData = JSON.stringify({ item: items });

	ajax({ url: 'data/add.php', request: 'POST', data: preparedData }, function(data){
		updateItems();
	});	
}

function addCategories(categories){
	var preparedData = JSON.stringify({ category: categories });

	ajax({ url: 'data/add.php', request: 'POST', data: preparedData }, function(data){
		updateCategories();
	});	
}

function updateCategories(){
	var catList = document.querySelector('.categories');

	ajax({ url: 'data/categories.php' }, function(data){
		var output = '';
		
		// if we have some data
		if(data && data != ''){
		
			data.categories.forEach(function(category){
				output += "<li><a href='#"+category.toLowerCase()+"'>"+category+"</a></li>";
			});

			if(data.errors && data.errors != ''){
				output += "<div class='error-message'>"+data.errors+"</p></div>";
			}

		}else{
			output += "<li><em>Oops&hellip; Can't find any categories!</em> <a href='./' class='no-cats-action'>Try refreshing?</a></li>";
		}

		catList.innerHTML = output;
	});

}

var filterList = document.querySelector('.filter-select');
var searchBox = document.querySelector('.search-query');

filterList.addEventListener('change', function(){ updateItems(); });
searchBox.addEventListener('keyup', function(){ updateItems(); });

function updateItems(){

	var filterList = document.querySelector('.filter-select');
	var searchBox = document.querySelector('.search-query');

	var searchQuery = searchBox.value;
	var filterType = filterList.value;

	var options = {};
	options.url = 'data/items.php';

	var dataToSend = {};

	if(searchQuery != ''){
		dataToSend.search = searchQuery;
	}

	if(filterType != ''){
		dataToSend.filter = filterType;
	}

	if(dataToSend.search || dataToSend.filter){
		options.request = 'POST';
		options.data = JSON.stringify(dataToSend);
	}

	ajax(options, function(data){
		populateItems(data);
	});	
}

function populateItems(data){
	var itemList = document.querySelector('.items');
	itemList.innerHTML = '';

	var output = '';


	// if we have some data
	if(data && data != ''){
	

		for(var i in data.items){
			var item = data.items[i];

			var listRadio = document.getElementById('list-display-option');
			var gridRadio = document.getElementById('grid-display-option');		
			
			var displayType = 'list';

			if(gridRadio.checked){
				displayType = 'grid';
			}

			output += "<li class='item-"+displayType+"' id='item-"+item.id+"'>";

			// if the item has an img
			if(item.img != 0){
				output += "<img src='images/"+item.id+".jpg' alt='Image of "+item.name+"'>";
			}else{
				output += "<div class='details-placeholder-img' title='Placeholder image of "+item.name+"'>Upload an image silly</div>";
			}
			
			output +=   "<div class='details'>" +
							"<h1 class='details-title'>" +
								"<a href='#"+item.name+"' title='More details on "+item.name+"?'>"+item.name+"</a>" +
							"</h1>" +
							"<p class='details-desc'>"+item.desc+"</p>" +
						"</div>" +
						"<div class='more-details'>" +
							"<p class='details-cat'>Found in "+item.cat+"</p>" +
							"<p class='details-stock'>"+item.stock+" left</p>" +
							"<p class='details-price'>" +
								"<a href='#"+item.name+"' title='More details on "+item.name+"?'>"+item.price+"</a>" +
							"</p>" +
						"</div>";

			output += "</li>";

		}

		if(data.errors != ''){
			output += "<div class='error-message'>"+data.errors+"</p></div>";
		}
	
	}else{
		output += "<div class='error-message'><em>Oops&hellip; Can't find any items!</em> <a href='./'>Try refreshing?</a></div>";
	}

	itemList.innerHTML = output;

	itemListeners();

}

function itemListeners(){
	var items = document.querySelector('.items');


	items.addEventListener('click', function(e){

		if(e.target != e.currentTarget){
			var clickedElm = e.target;

			while(clickedElm.id.indexOf('item-') == -1){
        		clickedElm = clickedElm.parentNode;
    		}

    		itemId = clickedElm.id.substring(5);
    		getPopUpData(itemId);

		}	

	}, false);
	
}

function getPopUpData(itemId){
	var options = {};

	var dataToSend = { 'id': itemId };

	options.url = 'data/popup.php';
	options.request = 'POST';
	options.data = JSON.stringify(dataToSend);

	ajax(options, function(data){
		populatePopUp(data);
	});	

	displayPopUp();
}

function populatePopUp(data){
	var item = data.items[0];

	var popup =  document.querySelector('.popup');

	var img = document.querySelector('.popup__img');
	img.setAttribute('src', "images/"+item.id+".jpg");
	img.setAttribute('alt', "Image of '"+item.name+"'");

	var details = document.querySelector('.popup .details');

	details.innerHTML =
			"<h1 class='details-title'>"+item.name+"</h1>
			<p class='details-cat'>Found in "+item.cat+"</p>
			<p class='details-desc'>"+item.desc+"</p>
			<p class='details-price'>"+item.price+"</p>
			<p class='details-stock'>"+item.stock+" left</p>"
}

function displayPopUp(){
	var content = document.querySelector('.content-container');
	content.classList.add('blurred');

	var popup = document.querySelector('.popup');
	popup.classList.remove('popup--hidden');
	
	basketClose();
}

function closePopUp(){
	var popup = document.querySelector('.popup');
	var close = document.querySelector('.popup_close');

	popup.addEventListener('click', function(e){
		if(e.target == e.currentTarget || e.target.className == 'popup_close' || e.target.parentNode.className == 'popup_close'){
			popup.classList.add('popup--hidden');

			var content = document.querySelector('.content-container');
			content.classList.remove('blurred');
		}
	});
}

function updateBasket(){			
	var basket = document.querySelector('.basket-items');
	ajax({ url: 'data/basket.json' }, function(data){

		for(var i in data.items){
			var item = data.items[i];

			basket.innerHTML +=  
			"<li class='item-list'>" +
				"<img src='images/"+item.id+".jpg' alt='Image of "+item.name+"'>" +
				"<div class='details'>" +
					"<h1 class='details-title'>" +
						"<a href='#"+item.name+"' title='More details on "+item.name+"?'>"+item.name+"</a>" +
					"</h1>" +
					"<p class='details-desc'>"+item.desc+"</p>" +
				"</div>" +
				"<div class='more-details'>" +
					"<p class='details-cat'>Found in "+item.cat+"</p>" +
					"<p class='details-stock'>"+item.stock+" left</p>" +
					"<p class='details-price'>" +
						"<a href='#"+item.name+"' title='More details on "+item.name+"?'>"+item.price+"</a>" +
					"</p>" +
				"</div>" +
			"</li>";

		}

		changeCheckoutItemAmount(data.items.length);

	});
}

// to swap any text with dirty icons
function iconSwap(){

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

function basketInit(){
	var checkoutLink = document.querySelector('.checkout');
	checkoutLink.addEventListener('click', basketToggle, false);
	
	var basketCloseButton = document.querySelector('.basket-close');
	basketCloseButton.addEventListener('click', basketClose, false);
}

function basketToggle(){
	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	checkoutLink.classList.toggle('checkout-alt');
	basket.classList.toggle('basket-closed');
}

function basketClose(){
	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	checkoutLink.classList.remove('checkout-alt');
	basket.classList.add('basket-closed');
}

function basketOpen(){
	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	checkoutLink.classList.remove('checkout-alt');
	basket.classList.remove('basket-closed');
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
		document.title = '('+amount+') ' + dormouse.title;
		checkoutItemAmount.title = "You have "+amount+" items, nice! :¬)";
	}else{
		checkoutItemAmount.innerHTML = 0;
		document.title = title;
		checkoutItemAmount.title = "There's nothing here!";
	}

	if(amount >= 1000){
		document.title = '('+amount+') ' + dormouse.title;
		checkoutItemAmount.innerHTML = '999+';
		checkoutItemAmount.title = "So many items! You have "+amount+" items. :¬O";
	}
}
	