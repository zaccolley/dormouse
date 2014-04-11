// basket

function initBasket(){
	localStorage.setItem('basketItems', JSON.stringify({ 'item': [] }));

	initBasketButtonsListeners();
	initBasketRemoveItemListener();
}

function initBasketButtonsListeners(){
	var checkoutLink = document.querySelector('.checkout');
	checkoutLink.addEventListener('click', toggleBasket, false);
	
	var basketCloseButton = document.querySelector('.basket-close');
	basketCloseButton.addEventListener('click', closeBasket, false);
}

function initBasketRemoveItemListener(){
	var basketPanel = document.querySelector('.basket-items');

	basketPanel.addEventListener('click', function(e){

		if(e.target != e.currentTarget && e.target.classList.contains('remove-item-button')){
			console.log(true);
			var clickedElm = e.target;

			while(clickedElm.id.indexOf('item-') == -1){
        		clickedElm = clickedElm.parentNode;
    		}

    		itemId = +clickedElm.id.substring(5);
    		removeFromBasket(itemId);

		}	

	}, false);
}

function toggleBasket(){
	updateBasket();

	var checkoutLink = document.querySelector('.checkout');

	checkoutLink.classList.toggle('checkout-alt');
	document.body.classList.toggle('basket-closed');
}

function closeBasket(){
	var checkoutLink = document.querySelector('.checkout');

	checkoutLink.classList.remove('checkout-alt');
	document.body.classList.add('basket-closed');
}

function openBasket(){
	updateBasket();

	var checkoutLink = document.querySelector('.checkout');

	checkoutLink.classList.remove('checkout-alt');
	document.body.classList.remove('basket-closed');
}

function updateBasket(){
	var basketStorage = JSON.parse(localStorage.getItem('basketItems'));

	var basket = document.querySelector('.basket-items');

	// reset
	basket.innerHTML = "";

	var basketItems = basketStorage.item;
	var basketItemsAmount = basketItems.length;

	changeCheckoutItemAmount(basketItemsAmount);

	var totalPrice = 0;

	for(var b in basketItems){
		var basketItem = basketItems[b];

		ajax({ url: 'data/item/'+basketItem.id }, function(json){
			var data = json.output;
			var item = data.items[0];

			var basketAmount = getBasketItemAmount(item.id);
			var basketPrice = item.price.value * basketAmount;

			var basketTotalEl = document.querySelector('.basket-checkout .total .value');
			
			totalPrice += basketPrice;
			basketTotalEl.innerHTML = item.price.currency+totalPrice.formatMoney(2);

			var basketPrice = basketPrice.formatMoney(2);

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
				// "<img src='images/"+item.id+".jpg' alt='Image of "+item.name+"'>" +
				"<img src='http://placekitten.com/48/48' alt='Image of "+item.name+"'>" +
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

function addToBasket(items){
	var basketItems = JSON.parse(localStorage.getItem('basketItems'));

	basketItems.item.push(items);

	localStorage.setItem('basketItems', JSON.stringify(basketItems));

	updateBasket();
}

function changeBasketItemAmount(itemId, amount){
	var basketItems = JSON.parse(localStorage.getItem('basketItems'));

	var items = basketItems.item;
	var newBasket = { 'item': [] };

	for(var i = 0; i <= items.length; i++){
		var item = items[i];

		if(item){
			if(item.id == itemId){

				if(amount > 0){
					var newItem = { 'id': +item.id, 'amount': +amount };

					newBasket.item.push(newItem);
				}

			}else{
				newBasket.item.push(item);
			}
		}

	}

	localStorage.setItem('basketItems', JSON.stringify(newBasket));

	updateBasket();
}

function removeFromBasket(itemId){
	var basketItems = JSON.parse(localStorage.getItem('basketItems'));

	var items = basketItems.item;
	var newBasket = { 'item': [] };

	for(var i = 0; i <= items.length; i++){
		var item = items[i];

		if(item && item.id !== itemId){
			newBasket.item.push(item);
		}

	}

	localStorage.setItem('basketItems', JSON.stringify(newBasket));

	updateBasket();
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

function changeCheckoutItemAmount(amount){
	var checkoutItemAmount = document.querySelector('.checkout-item-amount');

	if(amount > 0){
		checkoutItemAmount.innerHTML = amount;

		if(amount < 20){
			var enclosedNumbers = "⑴⑵⑶⑷⑸⑹⑺⑻⑼⑽⑾⑿⒀⒁⒂⒃⒄⒅⒆⒇";
			document.title =  dormouse.title+' - Basket: '+enclosedNumbers.charAt(amount-1);
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

