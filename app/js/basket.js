// basket

function initBasket(){
	var checkoutLink = document.querySelector('.checkout');
	checkoutLink.addEventListener('click', toggleBasket, false);
	
	var basketCloseButton = document.querySelector('.basket-close');
	basketCloseButton.addEventListener('click', closeBasket, false);
}

function toggleBasket(){
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
	var checkoutLink = document.querySelector('.checkout');
	var basket = document.querySelector('.basket');

	checkoutLink.classList.remove('checkout-alt');
	basket.classList.remove('basket-closed');
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
					"<p class='details-cat'>Found in "+item.cat.name+"</p>" +
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