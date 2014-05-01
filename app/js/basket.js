// basket

// initialize basket buttons
function initBasket(){
	// if there isnt any basket items in localstorage start that puppy up
	// also if its in debug mode it'll delete all the basket each time
	if(!localStorage.getItem('basketItems') || dormouse.debugBasket){
		localStorage.setItem('basketItems', JSON.stringify({ 'item': [] }));
	}

	initBasketButtonsListeners();
	initBasketRemoveItemListener();
}

// initialise basket button
function initBasketButtonsListeners(){
	var checkoutLink = document.querySelector('.checkout');
	checkoutLink.addEventListener('click', toggleBasket, false);
	
	var basketCloseButton = document.querySelector('.basket-close');
	basketCloseButton.addEventListener('click', closeBasket, false);
}

// initialise the basket remove button
function initBasketRemoveItemListener(){
	var basketPanel = document.querySelector('.basket-items');

	basketPanel.addEventListener('click', function(e){

		// this code is bubbling up to find what we're looking for

		if(e.target != e.currentTarget && e.target.classList.contains('remove-item-button')){
			var clickedElm = e.target;

			// if we find it we escape the loop
			while(clickedElm.id.indexOf('item-') == -1){
        		clickedElm = clickedElm.parentNode;
    		}

    		itemId = +clickedElm.id.substring(5);

    		clickedElm.classList.add('removed-item');
    		
    		// timeout so we can watch that animation wow
    		setTimeout(function(){ removeFromBasket(itemId); }, 500);

		}	

	}, false);
}

// toggle the basket
function toggleBasket(){
	updateBasket();

	var checkoutLink = document.querySelector('.checkout');

	checkoutLink.classList.toggle('checkout-alt');
	document.body.classList.toggle('basket-closed');
}

// close the basket
function closeBasket(){
	var checkoutLink = document.querySelector('.checkout');

	checkoutLink.classList.remove('checkout-alt');
	document.body.classList.add('basket-closed');
}

// open the basket
function openBasket(){
	updateBasket();

	var checkoutLink = document.querySelector('.checkout');

	checkoutLink.classList.remove('checkout-alt');
	document.body.classList.remove('basket-closed');
}

// update the basket
function updateBasket(){
	var basketStorage = JSON.parse(localStorage.getItem('basketItems'));

	var basket = document.querySelector('.basket-items');

	// reset
	basket.innerHTML = "";
	var basketTotalEl = document.querySelector('.basket-checkout .total .value');
	basketTotalEl.innerHTML = "0.00";

	var basketItems = basketStorage.item;
	var basketItemsAmount = basketItems.length;

	// this update the title and the basket counter
	changeCheckoutItemAmount(basketItemsAmount);

	// reset
	var totalPrice = 0;

	for(var b in basketItems){
		var basketItem = basketItems[b];

		ajax({ url: dormouse.url+'/data/item/'+basketItem.id }, function(json){
			var data = json.output;
			var item = data.items[0];

			var basketAmount = getBasketItemAmount(item.id);
			var basketPrice = item.price.value * basketAmount;

			var basketTotalEl = document.querySelector('.basket-checkout .total .value');
			
			totalPrice += basketPrice;
			basketTotalEl.innerHTML = item.price.currency+totalPrice.formatMoney(2);

			var basketPrice = basketPrice.formatMoney(2);

			// if there isnt a basket amount dont display amount
			if(basketAmount){
				basketAmount = "× <span class='details-stock-amount'>"+basketAmount+"</span>";
			}else{
				basketAmount = "Oops, try refreshing?";
			}

			var price = +item.price.value;
			price = price.formatMoney(2);

			basket.innerHTML +=  
			"<li class='item-list' id='item-"+item.id+"'>" +
				"<span class='remove-item'><button class='remove-item-button'>x</button></span>"+
				"<img src='"+dormouse.url+"/images/"+item.id+"' alt='Image of "+item.name+"'>" +
				"<div class='details'>" +
					"<h1 class='details-title'>" +
						"<a href='#"+item.name+"' title='More details on "+item.name+"?'>"+item.name+"</a>" +
					"</h1>" +
					"<p class='details-desc'>"+item.desc+"</p>" +
				"</div>" +
				"<div class='more-details'>" +
					"<p class='details-stock'><span class='details-price-currency'>"+item.price.currency+"</span>"+price+" "+basketAmount+"</p>" +
					"<p class='details-price'>" +
						"<span href='#"+item.name+"' title='More details on "+item.name+"?'>"+item.price.currency+basketPrice+"</span>" +
					"</p>" +
				"</div>" +
			"</li>";

		});

	}
	
	var basketAmountEl = document.querySelector('.basket-checkout .amount .value');
	basketAmountEl.innerHTML = basketItemsAmount;

}

function alterBasketItem(itemId, amount){
	var basket = JSON.parse(localStorage.getItem('basketItems'));
	var items = basket.item;

	var newItem = { "id": itemId, "amount": amount };

	var newItemIndex = items.indexOf(findById(items, itemId));

	// is item in basket
	if(newItemIndex != -1){

		if(amount > 0){
			// alter amount
			items.splice(newItemIndex, 1, newItem);
		}else{
			// remove from basket
			items.splice(newItemIndex, 1);
		}

	}else{
		// isn't in the basket - add to basket
		if(amount > 0){
			items.push(newItem);
		}
	}

	var newBasket = { "item": items };

	localStorage.setItem('basketItems', JSON.stringify(newBasket));

	updateBasket();
}

function removeFromBasket(itemId){
	alterBasketItem(itemId, 0);
}

function getBasketItemAmount(id){
	var basketStorage = JSON.parse(localStorage.getItem('basketItems'));

	for(var b in basketStorage.item){
		var item = basketStorage.item[b];

		if(item.id == id){
			return item.amount;
		}
	}

	return 0;
}

// this handles the checkout item amount in the title bar and the little icon by the checkout header icon
function changeCheckoutItemAmount(amount){
	var checkoutItemAmount = document.querySelector('.checkout-item-amount');

	if(amount > 0){
		checkoutItemAmount.innerHTML = amount;

		if(amount < 20){
			var enclosedNumbers = "⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇";
			document.title =  dormouse.title+' - Basket: '+enclosedNumbers.charAt(amount-1); // using a string like an array
		}else{
			document.title =  dormouse.title+' - Basket: ('+amount+')';
		}
		checkoutItemAmount.title = "You have "+amount+" items, nice! :¬)";

		if(amount > 1000){
			checkoutItemAmount.innerHTML = '999+';
			checkoutItemAmount.title = "So many items! You have "+amount+" items. :¬O";
		}

	}else{
		checkoutItemAmount.innerHTML = 0;
		document.title = dormouse.title;
		checkoutItemAmount.title = "There's nothing here!";
	}
}

