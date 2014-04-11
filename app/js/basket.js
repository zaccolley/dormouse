// basket

function initBasket(){
	var checkoutLink = document.querySelector('.checkout');
	checkoutLink.addEventListener('click', toggleBasket, false);
	
	var basketCloseButton = document.querySelector('.basket-close');
	basketCloseButton.addEventListener('click', closeBasket, false);
}

function toggleBasket(){
	updateBasket();

	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	checkoutLink.classList.toggle('checkout-alt');
	basket.classList.toggle('basket-closed');
}

function closeBasket(){
	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	checkoutLink.classList.remove('checkout-alt');
	basket.classList.add('basket-closed');
}

function openBasket(){
	updateBasket();

	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	checkoutLink.classList.remove('checkout-alt');
	basket.classList.remove('basket-closed');
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
			basketTotalEl.innerHTML = item.price.currency+totalPrice;

			var basketPrice = item.price.currency + basketPrice;

			if(basketAmount){
				basketAmount = "× <span class='details-stock-amount'>"+basketAmount+"</span>";
			}else{
				basketAmount = "Oops, try refreshing?";
			}

			basket.innerHTML +=  
			"<li class='item-list'>" +
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
					"<p class='details-stock'><span class='details-price-currency'>"+item.price.currency+"</span>"+item.price.value+" "+basketAmount+"</p>" +
					"<p class='details-price'>" +
						"<span href='#"+item.name+"' title='More details on "+item.name+"?'>"+basketPrice+"</span>" +
					"</p>" +
				"</div>" +
			"</li>";

		});

	}
	
	var basketAmountEl = document.querySelector('.basket-checkout .amount .value');
	basketAmountEl.innerHTML = basketItemsAmount;

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
			document.title = enclosedNumbers.charAt(amount-1) + ' ' + dormouse.title;
		}else{
			document.title = '('+amount+') ' + dormouse.title;
		}
		checkoutItemAmount.title = "You have "+amount+" items, nice! :¬)";
	}else{
		checkoutItemAmount.innerHTML = 0;
		document.title = dormouse.title;
		checkoutItemAmount.title = "There's nothing here!";
	}

	if(amount >= 1000){
		document.title = '('+amount+') ' + dormouse.title;
		checkoutItemAmount.innerHTML = '999+';
		checkoutItemAmount.title = "So many items! You have "+amount+" items. :¬O";
	}
}

