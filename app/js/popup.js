// popup

function getPopUpData(itemId){
	var options = {};

	options.url = dormouse.url+'/data/item/'+itemId;

	ajax(options, function(data){
		populatePopUp(data);
	});	

	displayPopUp();
}

function populatePopUp(json){
	var data = json.output;
	var item = data.items[0];

	var popup =  document.querySelector('.popup');

	popup.id = item.id;

	var img = document.querySelector('.popup__img img');
	if(item.img != 0){
		img.setAttribute('src', dormouse.url+"/images/"+item.id+".jpg");
		img.setAttribute('alt', "Image of '"+item.name+"'");
	}else{	
		img.setAttribute('src', "http://placekitten.com/200/200");
		img.setAttribute('alt', "Placeholder image of '"+item.name+"'");
	}

	var details = document.querySelector('.popup .details');

	var price = +item.price.value;
	price = price.formatMoney(2);

	details.innerHTML =
			"<h1 class='details-title'>"+item.name+"</h1>
			<p class='details-cat'>Found in "+item.cat.name+"</p>
			<p class='details-desc'>"+item.desc+"</p>
			<p class='details-price'><span class='details-price-currency'>"+item.price.currency+"</span>"+price+"</p>
			<p class='details-stock'>"+item.stock+" left</p>"
}

function displayPopUp(){
	var content = document.querySelector('.content-container');
	content.classList.add('content-container--blurred');

	var popup = document.querySelector('.popup');
	popup.classList.remove('popup--hidden');
	
	closeBasket();
}

function closePopUp(){
	var popup = document.querySelector('.popup');
	var close = document.querySelector('.popup_close');

	popup.addEventListener('click', function(e){
		if(e.target == e.currentTarget || e.target.className == 'popup_close' || e.target.parentNode.className == 'popup_close'){
			popup.classList.add('popup--hidden');

			popup.querySelector('.popup_tools .amount').selectedIndex = 0;

			var content = document.querySelector('.content-container');
			content.classList.remove('content-container--blurred');

			if(dormouse.category){
    			history.pushState(null, "", dormouse.url+"/category/"+dormouse.category);
			}else{
    			history.pushState(null, "", dormouse.url);
			}


		}
	});
}

function initAddToBasketButtonListener(){
	var popup = document.querySelector('.popup');
	var addButton = popup.querySelector('.popup_tools .add button');
	var addAmount = popup.querySelector('.popup_tools .add .amount');

	addButton.addEventListener('click', function(){
		var amountToAdd = +addAmount.value;
		var basketAmount = getBasketItemAmount(popup.id);

		var amount = amountToAdd + basketAmount;
		alterBasketItem(popup.id, amount);

		alertMessage('Added '+amountToAdd+'! ('+amount+' in the basket)', 'success');

	});

}